const path = require('path');
const fs = require('fs');
const pool = require('../db');
const validations = require('../middlewares/validation');

exports.getAllItems = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM polozka ORDER BY id ASC');
        res.json(result.rows);
    } catch (error) {
        console.error('Chyba naciatavania poloziek', error);
        res.status(500).json({message: 'Polozky sa nepodarilo nacitat'});
    }
};

exports.getNews = async (req, res) => {
    try {
        const result = await pool.query('SELECT p.id, p.nazov, p.cena, o.cesta FROM polozka p JOIN obrazky o ON p.id = o.polozka_id ORDER BY p.id DESC LIMIT 3;');
        res.json(result.rows);
    } catch (error) {
        console.error('Chyba naciatavania noviniek.', error);
        res.status(500).json({message: 'Novinky sa nepodarilo nacitat.'});
    }
};

exports.getItemDetailsById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT nazov, popis, cena, pocet_ks FROM polozka WHERE id = $1 LIMIT 1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Nenašla sa žiadna položka.' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Chyba pri získavaní položky:', error);
        res.status(500).json({ message: 'Chyba pri získavaní položky.' });
    }
};


exports.addItem = async (req, res) => {
    const {nazov, popis, cena, pocet_ks} = req.body;
    const mainImage = req.files['mainImage'][0];
    const otherImages = req.files['otherImages[]'] || [];

    try {
        await pool.query('BEGIN');

        const query = 'INSERT INTO polozka (nazov, popis, cena, pocet_ks) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [nazov, popis, parseFloat(cena), parseInt(pocet_ks)];
        await pool.query(query, values);

        const polozka = await pool.query('SELECT * FROM polozka ORDER BY id DESC LIMIT 1');
        
        if (polozka.rows.length > 0) {
            const polozkaId = polozka.rows[0].id;
            const filePath = path.join('uploads/images', mainImage.filename).replaceAll('\\', '/');
            await pool.query('INSERT INTO obrazky (polozka_id, cesta) VALUES ($1, $2)', [polozkaId, filePath]);

            for (const otherImage of otherImages)
            {
                const filePath = path.join('uploads/images', otherImage.filename).replaceAll('\\', '/');
                await pool.query('INSERT INTO obrazky (polozka_id, cesta) VALUES ($1, $2)', [polozkaId, filePath]);
            }
        } else {
            res.status(404).json({ message: 'Nenajdena polozka' });
        }

        await pool.query('COMMIT');
        res.json({message: 'Polozka uspesne pridana'});
    } catch (error) {
        await pool.query('ROLLBACK');

        const filePath = path.join('uploads/images', mainImage.filename).replaceAll('\\', '/');
        fs.unlinkSync(filePath);
        
        for (const otherImage of otherImages)
        {
            const filePath = path.join('uploads/images', otherImage.filename).replaceAll('\\', '/');
            fs.unlinkSync(filePath);
        }

        console.error('Chyba pri pridávaní položky:', error);
        res.status(500).json({ message: 'Chyba pri ukladaní položky do databázy.' });
    }
};

exports.deleteItemById = async (req, res) => {
    try {
        const { id } = req.params;

        const { rows: images } = await pool.query(
            'SELECT cesta FROM obrazky WHERE polozka_id = $1',
            [id]
        );

        for (const image of images) {
            const fullPath = path.join(__dirname, '..' , image.cesta);
            fs.unlink(fullPath, (err) => {
                if (err) {
                    console.error(`Chyba pri mazaní súboru ${image.cesta}:`, err);
                } else {
                    console.log(`Súbor ${image.cesta} úspešne vymazaný.`);
                }
            });
        }

        await pool.query('DELETE FROM obrazky WHERE polozka_id = $1', [id]);

        await pool.query('DELETE FROM polozka WHERE id = $1', [id]);

        res.json({ message: 'Položka a súvisiace obrázky boli úspešne vymazané.' });

    } catch (error) {
        console.error('Chyba pri odstraňovaní položky:', error);
        res.status(500).json({ message: 'Chyba pri odstraňovaní položky z databázy.' });
    }
};

exports.updateItemById = async (req, res) => {
    const { id } = req.params;
    const {nazov, popis, cena, pocet_ks, deleteImagesIds} = req.body;
    const mainImage = req.files['mainImage']?.[0];
    const otherImages = req.files['otherImages[]'] || [];

    try {
        await pool.query('BEGIN');

        await pool.query('UPDATE polozka SET nazov = $1, popis = $2, cena = $3, pocet_ks = $4 WHERE id = $5', [nazov, popis, cena, pocet_ks, id]);

        if (mainImage)
        {
            const filePath = path.join('uploads/images', mainImage.filename).replaceAll('\\', '/');
      
            const result = await pool.query('SELECT * FROM obrazky WHERE polozka_id = $1 ORDER BY id ASC LIMIT 1', [id]);
            const imagePath = result.rows[0].cesta;
            const fullPath = path.join(__dirname, '..' , imagePath);
            fs.unlink(fullPath, (err) => {
                if (err) {
                console.error(`Chyba pri mazaní súboru ${imagePath}:`, err);
                } else {
                console.log(`Súbor ${imagePath} úspešne vymazaný.`);
                }
            });

            await pool.query('UPDATE obrazky SET cesta = $1 WHERE id = (SELECT id FROM obrazky WHERE polozka_id = $2 ORDER BY id ASC LIMIT 1)', [filePath, id]);
        }

        if (Array.isArray(deleteImagesIds))
        {
            for (const imageId of deleteImagesIds)
                {
                    const result = await pool.query('SELECT cesta FROM obrazky WHERE id = $1 LIMIT 1', [imageId]);
        
                    const imagePath = result.rows[0].cesta;
                    const fullPath = path.join(__dirname, '..' , imagePath);
                    fs.unlink(fullPath, (err) => {
                        if (err) {
                        console.error(`Chyba pri mazaní súboru ${imagePath}:`, err);
                        } else {
                        console.log(`Súbor ${imagePath} úspešne vymazaný.`);
                        }
                    });
        
                    await pool.query('DELETE FROM obrazky WHERE id = $1', [imageId]);
                }
        }
        
        for (const otherImage of otherImages)
        {
            const filePath = path.join('uploads/images', otherImage.filename).replaceAll('\\', '/');
            await pool.query('INSERT INTO obrazky (polozka_id, cesta) VALUES ($1, $2)', [id, filePath]);
        }

        await pool.query('COMMIT');
        res.json({message: 'Polozka uspesne updatnuta'});
    } catch (error) {
        await pool.query('ROLLBACK');

        if (mainImage)
        {
            const filePath = path.join('uploads/images', mainImage.filename).replaceAll('\\', '/');
            fs.unlinkSync(filePath);
        }
        
        for (const otherImage of otherImages)
        {
            const filePath = path.join('uploads/images', otherImage.filename).replaceAll('\\', '/');
            fs.unlinkSync(filePath);
        }

        console.error('Chyba pri update položky.', error);
        res.status(500).json({ error: 'Chyba pri update položky.' });
    }
};
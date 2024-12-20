const path = require('path');
const fs = require('fs');
const pool = require('../db');

exports.getAllItems = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM polozka ORDER BY id ASC');
        res.json(result.rows);
    } catch (error) {
        console.error('Chyba naciatavania poloziek', error);
        res.status(500).json({message: 'Polozky sa nepodarilo nacitat'});
    }
};

exports.getLastItem = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM polozka ORDER BY id DESC LIMIT 1');
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Nenašla sa žiadna položka.' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Chyba pri získavaní poslednej položky:', error);
        res.status(500).json({ message: 'Chyba pri získavaní položky.' });
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

    try {
        const query = 'INSERT INTO polozka (nazov, popis, cena, pocet_ks) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [nazov, popis, parseFloat(cena), parseInt(pocet_ks)];

        const result = await pool.query(query, values);

        res.status(201).json({
            message: 'Polozka uspesne pridana',
            data: result.rows[0],
        });
    } catch (error) {
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
    const {nazov, popis, cena, pocet_ks} = req.body;

    try {
        await pool.query('UPDATE polozka SET nazov = $1, popis = $2, cena = $3, pocet_ks = $4 WHERE id = $5', [nazov, popis, cena, pocet_ks, id]);
        res.json({message: 'Polozka uspesne updatnuta'});
    } catch (error) {
        console.error('Chyba pri update položky.', err);
        res.status(500).json({ error: 'Chyba pri update položky.' });
    }
};
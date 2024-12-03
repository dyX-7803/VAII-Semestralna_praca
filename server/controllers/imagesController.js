const path = require('path');
const multer = require('multer');
const fs = require('fs');
const pool = require('../db');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/images');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
});

exports.upload = multer({ storage: storage });

exports.uploadImage = async (req, res) => {
    try {
      const lastPolozka = await pool.query('SELECT * FROM polozka ORDER BY id DESC LIMIT 1');
      if (lastPolozka.rows.length > 0) {
        const polozkaId = lastPolozka.rows[0].id;
        const filePath = path.join('uploads/images', req.file.filename).replaceAll('\\', '/');
  
        await pool.query('INSERT INTO obrazky (polozka_id, cesta) VALUES ($1, $2)', [polozkaId, filePath]);
  
        res.json({ message: 'Obrázok úspešne nahraný', filePath });
      } else {
        res.status(404).json({ message: 'Nenajdena polozka' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Nepodarilo sa nahrat obrazok' });
    }
  };


  exports.getMainImagePathByItemId = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await pool.query('SELECT * FROM obrazky WHERE polozka_id = $1 ORDER BY id ASC LIMIT 1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Nenašla sa žiadna cesta.' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Nepodarilo sa ziskat cestu' });
    }
  };

  exports.getAllImagesByItemId = async (req, res) => {
    try {
      const {id} = req.params;
      const result = await pool.query('SELECT * FROM obrazky WHERE polozka_id = $1 ORDER BY id ASC', [id]);
      res.json(result.rows);
    } catch (error) {
      console.error('Chyba naciatavania obrazkov', error);
      res.status(500).json({message: 'Obrazky sa nepodarilo nacitat'});
    }
  };

  exports.deleteImageById = async (req, res) => {
    try {
      const {id} = req.params;
      const result = await pool.query('SELECT cesta FROM obrazky WHERE id = $1 LIMIT 1', [id]);

      const imagePath = result.rows[0].cesta;
      const fullPath = path.join(__dirname, '..' , imagePath);
      fs.unlink(fullPath, (err) => {
        if (err) {
          console.error(`Chyba pri mazaní súboru ${imagePath}:`, err);
        } else {
          console.log(`Súbor ${imagePath} úspešne vymazaný.`);
        }
      });

      await pool.query('DELETE FROM obrazky WHERE id = $1', [id]);
      res.json({ message: 'Obrázok vymazaný.' });

    } catch (error) {
      console.error('Chyba pri odstraňovaní obrázku.', error);
      res.status(500).json({ message: 'Chyba pri odstraňovaní obrázku z databázy.' });
    }
  };

  exports.updateMainImage = async (req, res) => {
    try {
      const {id} = req.params;
      const filePath = path.join('uploads/images', req.file.filename).replaceAll('\\', '/');
      
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

      await pool.query('UPDATE obrazky SET cesta = $1 WHERE id = (SELECT id FROM obrazky WHERE polozka_id = $2 ORDER BY id ASC LIMIT 1)', 
        [filePath, id]);
      
      res.json({message: 'Obrazok uspesne updatnuty'});
    } catch (error) {
      console.error('Chyba pri updatovaní hlavného obrázku.', error);
      res.status(500).json({ message: 'Chyba pri updovaní hlavného obrázku v databáze.' });
    }
  };



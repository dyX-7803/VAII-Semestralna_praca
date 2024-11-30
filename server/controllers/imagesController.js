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


  exports.getMainImagePath = async (req, res) => {
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



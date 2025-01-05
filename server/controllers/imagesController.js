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




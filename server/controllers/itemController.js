const pool = require('../db');

exports.getAllItems = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM polozka');
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
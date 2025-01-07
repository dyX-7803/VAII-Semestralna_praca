const pool = require('../db');


exports.getUserCart = async (req, res) => {

    try {
        const { id } = req.params;
        const result = await pool.query(`SELECT DISTINCT ON (k.polozka_id) k.polozka_id, p.nazov, p.cena, p.pocet_ks, o.cesta, k.pocet_ks 
            FROM kosik k JOIN polozka p ON p.id = k.polozka_id JOIN obrazky o ON o.polozka_id = p.id 
            WHERE k.pouzivatel_id = $1 ORDER BY k.polozka_id ASC, o.id ASC;`, [id]);
        res.json(result.rows);

    } catch (error) {
        console.error('Chyba naciatavania poloziek kosika.', error);
        res.status(500).json({message: 'Polozky kosika sa nepodarilo nacitat.'});
    }
};

exports.increaseQuantity = async (req, res) => {
    const { pouzivatel_id, polozka_id } = req.body;

    try {
        const result = await pool.query(
            `UPDATE kosik 
             SET pocet_ks = pocet_ks + 1 
             WHERE pouzivatel_id = $1 AND polozka_id = $2 
             RETURNING *;`,
            [pouzivatel_id, polozka_id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Záznam nenájdený.' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Chyba servera.' });
    }
};

exports.decreaseQuantity = async (req, res) => {
    const { pouzivatel_id, polozka_id } = req.body;

    try {
        const result = await pool.query(
            `UPDATE kosik 
             SET pocet_ks = pocet_ks - 1 
             WHERE pouzivatel_id = $1 AND polozka_id = $2 AND pocet_ks > 1 
             RETURNING *;`,
            [pouzivatel_id, polozka_id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Záznam nenájdený alebo pocet_ks je už 1.' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Chyba servera.' });
    }
};

exports.deleteItem = async (req, res) => {
    const { pouzivatel_id, polozka_id } = req.query;

    try {
        const query = `DELETE FROM kosik 
                    WHERE pouzivatel_id = $1 AND polozka_id = $2`;
        const result = await pool.query(query, [pouzivatel_id, polozka_id]);

        if (result.rowCount > 0) {
            return res.status(200).json({ message: "Položka bola úspešne odstránená z košíka." });
        } else {
            return res.status(404).json({ message: "Položka sa nenašla v košíku." });
        }
    } catch (error) {
        console.error("Chyba pri mazaní položky z košíka.", error);
        return res.status(500).json({ message: "Nastala chyba na serveri." });
    }
};

exports.addItem = async (req, res) => {
    const { pouzivatel_id, polozka_id, pocet_ks } = req.body;

    try {
        const checkQuery = `SELECT * FROM kosik WHERE pouzivatel_id = $1 AND polozka_id = $2`;
        const checkResult = await pool.query(checkQuery, [pouzivatel_id, polozka_id]);

        if (checkResult.rows.length > 0) {
            return res.status(409).json({ message: "Položka už existuje v košíku." });
        } else {
            const insertQuery = `
                INSERT INTO kosik (pouzivatel_id, polozka_id, pocet_ks)
                VALUES ($1, $2, $3)
                RETURNING *;
            `;
            const insertResult = await pool.query(insertQuery, [pouzivatel_id, polozka_id, pocet_ks]);
            return res.status(201).json(insertResult.rows[0]);
        }
    } catch (error) {
        console.error("Chyba pri pridávaní položky do košíka.", error);
        return res.status(500).json({ message: "Nastala chyba na serveri." });
    }
};

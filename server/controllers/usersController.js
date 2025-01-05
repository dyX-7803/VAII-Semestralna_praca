const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {

    const { email, password, role } = req.body;
    

    try {
        const userAlreadyExists = await pool.query('SELECT * FROM pouzivatelia WHERE email = $1', [email]);
        if (userAlreadyExists.rows.length > 0)
        {
            return res.status(400).json({message: 'Používateľ s týmto emailom už existuje.'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query('INSERT INTO pouzivatelia (email, password, role) VALUES ($1, $2, $3)', [email, hashedPassword, role]);

        res.status(201).json({message: 'Používateľ úspešne registrovaný.'});
    } catch (error) {
        console.error('Chyba pri registrácii:', error);
        res.status(500).json({ message: 'Chyba pri registrácii.' });
    }
};

exports.login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await pool.query('SELECT * FROM pouzivatelia WHERE email = $1', [email]);
        if (user.rows.length === 0)
        {
            return res.status(401).json({ message: 'Užívateľ s daným emailom neexistuje.' });
        }

        const isPasswordOk = await bcrypt.compare(password, user.rows[0].password);
        if (!isPasswordOk)
        {
            return res.status(401).json({ message: 'Nesprávane heslo.' });
        }

        const token = jwt.sign(
            {id: user.rows[0].id, role: user.rows[0].role},
            'myKey',
            {expiresIn: '1h'}
        );

        res.json({ token });

    } catch (error) {
        console.error('Chyba pri prihlásení:', error);
        res.status(500).json({ message: 'Chyba pri prihlásení.' });
    }
};
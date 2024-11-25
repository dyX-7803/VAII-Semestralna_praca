const express = require('express')
const pool = require('./db');


const app = express();

app.use(express.json());

app.get('/api/polozka', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM polozka');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// app.get("/api", (req, res) => {
//     res.json({"users": ["userOne", "userTwo", "userThree"] })
// })

app.listen(5000, () => {console.log("Server started on port 5000")})
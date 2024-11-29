const express = require('express')
const itemRoutes = require('./routes/itemRoutes');
const path = require('path');

const app = express();

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/polozka', itemRoutes);

app.listen(5000, () => {console.log("Server started on port 5000")})
const express = require('express')
const itemRoutes = require('./routes/itemRoutes');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/polozka', itemRoutes);

app.listen(5000, () => {console.log("Server started on port 5000")})
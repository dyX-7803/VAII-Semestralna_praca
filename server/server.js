const express = require('express')
const itemRouter = require('./routes/itemRoutes');
const imagesRoutes = require('./routes/imagesRoutes');
const usersRoutes = require('./routes/usersRoutes');
const shoppingCartRoutes = require('./routes/shoppingCartRoutes');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/polozka', itemRouter);
app.use('/api/obrazky', imagesRoutes);
app.use('/api/pouzivatelia', usersRoutes);
app.use('/api/kosik', shoppingCartRoutes);

app.listen(5000, () => {console.log("Server started on port 5000")});
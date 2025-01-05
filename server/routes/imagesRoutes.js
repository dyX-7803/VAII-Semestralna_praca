const express = require('express');
const imagesController = require('../controllers/imagesController');
const validations = require('../middlewares/validation');

const router = express.Router();

router.get('/getPath/:id', imagesController.getMainImagePathByItemId);
router.get('/getAllImagesByItemId/:id', imagesController.getAllImagesByItemId);

module.exports = router;
const express = require('express');
const imagesController = require('../controllers/imagesController');

const router = express.Router();

router.post('/upload', imagesController.upload.single('image'), imagesController.uploadImage);
router.get('/getPath/:id', imagesController.getMainImagePath);

module.exports = router;
const express = require('express');
const imagesController = require('../controllers/imagesController');

const router = express.Router();

router.post('/upload/:itemId?', imagesController.upload.single('image'), imagesController.uploadImage);
router.get('/getPath/:id', imagesController.getMainImagePathByItemId);
router.get('/getAllImagesByItemId/:id', imagesController.getAllImagesByItemId);
router.delete('/deleteById/:id', imagesController.deleteImageById);
router.put('/updateMainImageByItemId/:id', imagesController.upload.single('image'), imagesController.updateMainImage);

module.exports = router;
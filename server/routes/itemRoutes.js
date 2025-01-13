const express = require('express');
const itemController = require('../controllers/itemController');
const validations = require('../middlewares/validation');
const { upload } = require('../controllers/imagesController');

const router = express.Router();

router.get('/', itemController.getAllItems);
router.get('/getDetailsById/:id', itemController.getItemDetailsById);
router.delete('/deleteItemById/:id', 
    validations.userAuthentification, 
    validations.userAuthorize(['admin']), 
    itemController.deleteItemById);
router.get('/getNews', itemController.getNews);

router.post('/add', upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'otherImages[]'}
]), validations.itemValidation,
    validations.userAuthentification,
    validations.userAuthorize(['admin']),
itemController.addItem);

router.put('/updateItemById/:id', upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'otherImages[]'}
]), validations.itemValidation,
    validations.userAuthentification, 
    validations.userAuthorize(['admin']), 
itemController.updateItemById);

module.exports = router;
const express = require('express');
const itemController = require('../controllers/itemController');
const validations = require('../middlewares/validation');

const router = express.Router();

router.get('/', itemController.getAllItems);
router.get('/last', itemController.getLastItem);
router.get('/getDetailsById/:id', itemController.getItemDetailsById);
router.delete('/deleteItemById/:id', itemController.deleteItemById);
router.post('/add', validations.addItemValidation, itemController.addItem);
router.put('/updateItemById/:id', itemController.updateItemById);

module.exports = router;
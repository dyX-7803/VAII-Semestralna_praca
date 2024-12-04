const express = require('express');
const itemController = require('../controllers/itemController');
const validations = require('../middlewares/validation');

const router = express.Router();

router.get('/', itemController.getAllItems);
router.post('/add', validations.addItemValidation, itemController.addItem);
router.get('/last', itemController.getLastItem);
router.delete('/deleteItemById/:id', itemController.deleteItemById);
router.put('/updateItemById/:id', itemController.updateItemById);

module.exports = router;
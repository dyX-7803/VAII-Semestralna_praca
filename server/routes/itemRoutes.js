const express = require('express');
const itemController = require('../controllers/itemController');

const router = express.Router();

router.get('/', itemController.getAllItems);
router.post('/add', itemController.addItem);
router.get('/last', itemController.getLastItem);
router.delete('/deleteItemById/:id', itemController.deleteItemById);
router.put('/updateItemById/:id', itemController.updateItemById);

module.exports = router;
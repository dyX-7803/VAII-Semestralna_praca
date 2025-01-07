const express = require('express');
const shoppingCartController = require('../controllers/shoppingCartController');

const router = express.Router();

router.get('/getUserCart/:id', shoppingCartController.getUserCart);
router.put('/increaseQuantity', shoppingCartController.increaseQuantity);
router.put('/decreaseQuantity', shoppingCartController.decreaseQuantity);
router.delete('/deleteItem', shoppingCartController.deleteItem);
router.post('/addItem', shoppingCartController.addItem);

module.exports = router;
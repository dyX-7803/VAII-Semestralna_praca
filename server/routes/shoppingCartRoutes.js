const express = require('express');
const shoppingCartController = require('../controllers/shoppingCartController');
const validations = require('../middlewares/validation');

const router = express.Router();

router.get('/getUserCart/:id', shoppingCartController.getUserCart);
router.put('/increaseQuantity', validations.userAuthentification, shoppingCartController.increaseQuantity);
router.put('/decreaseQuantity', validations.userAuthentification, shoppingCartController.decreaseQuantity);
router.delete('/deleteItem', validations.userAuthentification, shoppingCartController.deleteItem);
router.post('/addItem', validations.userAuthentification, shoppingCartController.addItem);

module.exports = router;
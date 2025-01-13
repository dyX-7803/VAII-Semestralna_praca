const express = require('express');
const usersController = require('../controllers/usersController');
const validations = require('../middlewares/validation');

const router = express.Router();

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/getEmail/:id', usersController.getEmail);
router.put('/changePassword', usersController.changePassword);
router.delete('/deleteUser/:id', usersController.deleteUser);

module.exports = router;
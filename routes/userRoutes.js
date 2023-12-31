const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/', UserController.index);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/home', UserController.home);
router.post('/logout', UserController.logout);

module.exports = router;
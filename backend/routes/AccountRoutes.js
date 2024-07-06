const express = require('express');
const accountController = require('../controllers/AccountController');
const router = express.Router();

router.post('/login', accountController.login);

router.get('/id/:id', accountController.getAccountById);

router.post('', accountController.createAccount);

router.put('/id/:id/password', accountController.updatePassword);

module.exports = router;
const express = require('express');
const accountController = require('../../controllers/account.controller');
const router = express.Router();

router.post('/login', accountController.login);

router.get('/:id', accountController.getAccountById);

router.post('/', accountController.createAccount);

router.put('/:id/password', accountController.updatePassword);

module.exports = router;
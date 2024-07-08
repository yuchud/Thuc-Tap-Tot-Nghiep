const express = require('express');
const accountController = require('../controllers/account.controller');
const router = express.Router();

router.get('/:id', accountController.getAccountById);
router.get('/', accountController.getAllAccounts);

router.post('/login', accountController.login);
router.post('/', accountController.createAccount);

router.put('/:id/password', accountController.updatePassword);

router.delete('/:id', accountController.deleteAccount);
module.exports = router;
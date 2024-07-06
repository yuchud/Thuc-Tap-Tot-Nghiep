const express = require('express');
const customerController = require('../controllers/CustomerController');
const router = express.Router();

router.post('', customerController.createCustomer);
router.get('/id/:id', customerController.getCustomerById);

module.exports = router;
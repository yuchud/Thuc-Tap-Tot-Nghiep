const router = require('express').Router();
const vnpayController = require('../controllers/vnpay.controller');

router.post('/create_payment_url', vnpayController.createPaymentUrl);

module.exports = router;

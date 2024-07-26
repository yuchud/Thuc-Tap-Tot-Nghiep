const router = require('express').Router();
const accountCardDetailController = require('../controllers/account-card-detail.controller');

router.get('/', accountCardDetailController.getAccountCardDetails);

module.exports = router;

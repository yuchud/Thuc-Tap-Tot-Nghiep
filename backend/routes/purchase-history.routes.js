const router = require('express').Router();
const purchaseHistoryController = require('../controllers/purchase-history.controller');

router.get('/:account_id', purchaseHistoryController.getPurchaseHistory);

module.exports = router;

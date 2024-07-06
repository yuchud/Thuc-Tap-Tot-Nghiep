const express = require('express');
const proPlanController = require('../controllers/ProPlanController');
const router = express.Router();

router.get('', proPlanController.getAllProPlans);
router.get('/id/:id', proPlanController.getProPlanById);

router.post('', proPlanController.createProPlan);

module.exports = router;
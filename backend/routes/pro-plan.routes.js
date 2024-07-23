const express = require('express');
const proPlanController = require('../controllers/pro-plan.controller');
const router = express.Router();

router.get('/', proPlanController.getAllProPlans);
router.get('/:id', proPlanController.getProPlanById);

router.post('/', proPlanController.createProPlan);

router.put('/:id', proPlanController.updateProPlan);

router.delete(':id', proPlanController.deleteProPlan);
module.exports = router;

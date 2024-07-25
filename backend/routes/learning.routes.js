const express = require('express');
const router = express.Router();

const learningController = require('../controllers/learning.controller');

router.post('/finish', learningController.finishLearning);

module.exports = router;

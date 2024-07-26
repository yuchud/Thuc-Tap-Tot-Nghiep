const express = require('express');
const router = express.Router();

const learningController = require('../controllers/learning.controller');

router.get('/deck', learningController.getCardsToStudyInDeck);
router.get('/course', learningController.getCardsToStudyInCourse);
router.post('/finish', learningController.finishLearning);

module.exports = router;

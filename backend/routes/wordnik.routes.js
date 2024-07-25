const express = require('express');
const router = express.Router();

const wordnikController = require('../controllers/wordnik.controller');

router.get('/audios/:word', wordnikController.getAudios);
router.get('/pronunciations/:word', wordnikController.getPronunciations);
module.exports = router;

const express = require('express');
const router = express.Router();

const WordClassController = require('../controllers/word-class.controller');

router.get('/', WordClassController.getAllWordClasses);

module.exports = router;

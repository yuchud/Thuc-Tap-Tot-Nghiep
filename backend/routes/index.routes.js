const express = require('express');
const router = express.Router();

const accountRoutes = require('./account.routes');
const deckRoutes = require('./deck.routes');
const proPlanRoutes = require('./pro-plan.routes');
const courseRoutes = require('./course.routes');
const cardRoutes = require('./card.routes');
const wordClassRoutes = require('./word-class.routes');
const accountCardDetailRoutes = require('./account-card-detail.routes');
const learningRoutes = require('./learning.routes');

const wordnikRoutes = require('./wordnik.routes');


router.use('/accounts', accountRoutes);
router.use('/decks', deckRoutes);
router.use('/pro-plans', proPlanRoutes);
router.use('/courses', courseRoutes);
router.use('/cards', cardRoutes);
router.use('/word-classes', wordClassRoutes);
router.use('/account-card-details', accountCardDetailRoutes);
router.use('/learning', learningRoutes);
router.use('/wordnik', wordnikRoutes);

module.exports = router;

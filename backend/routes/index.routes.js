const express = require('express');
const router = express.Router();

const accountRoutes = require('./account.routes');
const deckRoutes = require('./deck.routes');
const proPlanRoutes = require('./pro-plan.routes');
const courseRoutes = require('./course.routes');

router.use('/accounts', accountRoutes);
router.use('/decks', deckRoutes);
router.use('/pro-plans', proPlanRoutes);
router.use('/courses', courseRoutes);

module.exports = router;

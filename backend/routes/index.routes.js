const express = require('express');
const router = express.Router();

const accountRoutes = require('./account.routes');
const deckRoutes = require('./deck.routes');
const customerRoutes = require('./customer.routes');
const proPlanRoutes = require('./pro-plan.routes');

router.use('/accounts', accountRoutes);
router.use('/decks', deckRoutes);
router.use('/customers', customerRoutes);
router.use('/pro-plans', proPlanRoutes);

module.exports = router;
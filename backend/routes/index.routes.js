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
const purchaseHistoryRoutes = require('./purchase-history.routes');
const dashboardRoutes = require('./dashboard.routes');
const notificationRoutes = require('./notification.routes');
const wordnikRoutes = require('./wordnik.routes');
const vnpayRoutes = require('./vnpay.routes');

router.use('/accounts', accountRoutes);
router.use('/decks', deckRoutes);
router.use('/pro-plans', proPlanRoutes);
router.use('/courses', courseRoutes);
router.use('/cards', cardRoutes);
router.use('/word-classes', wordClassRoutes);
router.use('/account-card-details', accountCardDetailRoutes);
router.use('/purchase-histories', purchaseHistoryRoutes);
router.use('/learning', learningRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/notifications', notificationRoutes);
router.use('/wordnik', wordnikRoutes);
router.use('/vnpay', vnpayRoutes);

module.exports = router;

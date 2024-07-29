const router = require('express').Router();
const dashboardController = require('../controllers/dashboard.controller');

router.get('/revenue-daily-in-month/:year/:month', dashboardController.getRevenueDailyInMonth);
router.get('/revenue-monthly-in-year/:year', dashboardController.getRevenueMonthlyInYear);
router.get('/revenue-in-month/:year/:month', dashboardController.getRevenueInMonth);
router.get('/revenue-in-year/:year', dashboardController.getRevenueInYear);

router.get('/pro-plans-in-year/:year', dashboardController.getProPlansInYear);

router.get('/top-pro-plans-in-month/:year/:month', dashboardController.getTopProPlansInMonth);
router.get('/top-pro-plans-in-year/:year', dashboardController.getTopProPlansInYear);

router.get('/created-accounts-in-month/:year/:month', dashboardController.getCreatedAccountsInMonth);
router.get('/created-accounts-in-year/:year', dashboardController.getCreatedAccountsInYear);
router.get('/created-accounts-daily-in-month/:year/:month', dashboardController.getCreatedAccountsDailyInMonth);
module.exports = router;

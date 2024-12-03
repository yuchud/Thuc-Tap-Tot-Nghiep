const express = require('express');
const accountController = require('../controllers/account.controller');
const router = express.Router();
const { sendOtpToEmail } = require('../services/otp.service');
const { resetPasswordWithOTP } = require('../services/account.service');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/:id', accountController.getAccountById);
router.get('/', accountController.getAllAccounts);

router.post('/login', accountController.login);
router.post('/admin/login', accountController.adminLogin);
router.post('/register', accountController.createAccount);

router.put('/:id', upload.single('file'), accountController.updateAccount);
router.put('/:id/password', accountController.updatePassword);
router.put('/:id/toggle-banned', accountController.toggleAccountBannedStatus);

router.delete('/:id', accountController.deleteAccount);

router.get('/:id/weekly-learn-tracker', accountController.getAccountWeeklyLearnTracker);
router.get('/:id/learn-streak', accountController.getAccountLearnStreak);
router.get('/:id/learned-cards-count', accountController.getAccountLearnedCardsCount);

router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = await sendOtpToEmail(email);
  res.json(otp);
});

router.post('/reset-password', accountController.resetPasswordWithOTP);
module.exports = router;

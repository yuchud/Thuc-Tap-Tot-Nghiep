const express = require('express');
const router = express.Router();

const notificationController = require('../controllers/notification.controller');

router.get('/account/:id', notificationController.getNotificationsForAccount);
router.get('/:id', notificationController.getNotification);
router.post('/send', notificationController.sendNotificationToAccounts);
module.exports = router;

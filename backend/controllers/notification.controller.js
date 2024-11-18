const notificationService = require('../services/notification.service');
const http = require('http-status-codes');
const accountService = require('../services/account.service');

const notificationController = {
  sendNotificationToAccounts: async (req, res) => {
    try {
      const { sender_id, recipient_ids, title, message } = req.body;
      if (!recipient_ids || !title || !message) {
        return res.status(http.StatusCodes.BAD_REQUEST).json({ message: 'Missing required fields' });
      }
      await notificationService.sendNotificationToAccounts(sender_id, recipient_ids, title, message);
      return res.status(http.StatusCodes.OK).json({ message: 'Notification sent' });
    } catch (error) {
      console.log(error);
      res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  },
  getNotificationsForAccount: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(http.StatusCodes.BAD_REQUEST).json({ message: 'Missing required fields' });
      }
      const account = accountService.getAccountById(id);
      if (!account) {
        return res.status(http.StatusCodes.NOT_FOUND).json({ message: 'Account not found' });
      }
      const notifications = await notificationService.getNotificationsForAccount(id);

      return res.status(http.StatusCodes.OK).json(notifications);
    } catch (error) {
      console.log(error);
      res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  },
  getNotification: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(req.params);
      const { is_mark_read } = req.query;
      if (!id) {
        return res.status(http.StatusCodes.BAD_REQUEST).json({ message: 'Missing required fields' });
      }
      let notification = await notificationService.getNotificationById(id);
      if (!notification) {
        return res.status(http.StatusCodes.NOT_FOUND).json({ message: 'Notification not found' });
      }
      if (is_mark_read) {
        await notificationService.markNotificationAsRead(id);
      }

      notification = await notificationService.getNotificationById(id);

      return res.status(http.StatusCodes.OK).json(notification);
    } catch (error) {
      console.log(error);
      res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  },
};

module.exports = notificationController;

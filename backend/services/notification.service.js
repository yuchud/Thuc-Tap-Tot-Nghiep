const NotificationModel = require('../models/notification.model');
const AccountModel = require('../models/account.model');
const io = require('../server').io;

const notificationService = {
  sendNotificationToAccounts: async (senderId, recipientIds, title, message) => {
    // Send notification to user
    try {
      for (const recipientId of recipientIds) {
        const notification = await NotificationModel.create({
          sender_id: senderId,
          recipient_id: recipientId,
          title,
          message,
        });
        io.emit('new_notification', { notification });
      }
      console.log('Gửi thông báo thành công');
    } catch (error) {
      console.error('Gửi thông báo thất bại:', error);
    }
  },

  getNotificationsForAccount: async (accountId) => {
    try {
      const notifications = await NotificationModel.findAll({
        where: { recipient_id: accountId, is_deleted: false },
        order: [['created_at', 'DESC']],
      });

      return notifications;
    } catch (error) {
      console.error('Lấy thông báo thất bại:', error);
      return [];
    }
  },
  getNotificationById: async (notificationId) => {
    try {
      const notification = await NotificationModel.findOne({
        where: { id: notificationId },
      });
      return notification;
    } catch (error) {
      console.error('Lấy thông báo thất bại:', error);
      return null;
    }
  },
  markNotificationAsRead: async (notificationId) => {
    try {
      const notification = await NotificationModel.findOne({
        where: { id: notificationId },
      });

      if (notification) {
        notification.is_read = true;
        await notification.save();
      }
    } catch (error) {
      console.error('Đánh dấu thông báo đã đọc thất bại:', error);
    }
  },
  deleteNotification: async (notificationId) => {
    try {
      const notification = await NotificationModel.findOne({
        where: { id: notificationId },
      });

      if (notification) {
        notification.is_deleted = true;
        await notification.save();
      }
    } catch (error) {
      console.error('Xóa thông báo thất bại:', error);
    }
  },
};

module.exports = notificationService;

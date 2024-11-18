// frontend/src/services/NotificationService.js
import { BASE_API_URL } from '../constants/api';

export const fetchNotifications = async (accountId) => {
  try {
    const response = await fetch(`${BASE_API_URL}/notifications/account/${accountId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
};

export const markNotificationAsRead = async (notificationId) => {
  try {
    await fetch(`${BASE_API_URL}/notifications/${notificationId}?is_mark_read=true`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
  }
};

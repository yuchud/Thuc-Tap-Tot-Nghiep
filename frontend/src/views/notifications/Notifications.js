import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { fetchNotifications, markNotificationAsRead } from 'src/services/NotificationService';
import '../../assets/css/Notifications.css';
import { GetCurrentAccountId } from 'src/services/AuthService';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  //   const history = useHistory();

  const fetchNotifications = async (accountId) => {
    const response = await fetch(`http://localhost:3000/api/notifications/account/${accountId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const accountId = GetCurrentAccountId();
      console.log(accountId);
      const data = await fetchNotifications(accountId);
      setNotifications(data);
      console.log(data);
    };

    fetchData();
  }, []);

  const handleNotificationClick = async (notification) => {
    setSelectedNotification(notification);
    if (!notification.is_read) {
      await markNotificationAsRead(notification.id);
      setNotifications((prevNotifications) =>
        prevNotifications.map((n) => (n.id === notification.id ? { ...n, is_read: true } : n)),
      );
    }
  };

  return (
    <div className="notification-page">
      <div className="sidebar">
        <h2>Thông báo</h2>
        <ul>
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`notification-item ${!notification.is_read ? 'unread' : ''}`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="notification-title">
                {notification.title}
                {!notification.is_read && <span className="unread-dot"></span>}
              </div>
              <div className="notification-time">
                {new Date(notification.created_at).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="main-screen">
        {selectedNotification ? (
          <>
            <h2>{selectedNotification.title}</h2>
            <hr />
            <p>{selectedNotification.message}</p>
          </>
        ) : (
          <p>Chọn thông báo để xem</p>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;

import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import {
  fetchNotifications,
  markNotificationAsRead,
  deleteNotification,
} from 'src/services/NotificationService';
import '../../assets/css/Notifications.css';
import { GetCurrentAccountId } from 'src/services/AuthService';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);

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

  const handleDeleteNotification = async (notification) => {
    const notificationId = notification.id;
    await deleteNotification(notificationId);
    setNotifications((prevNotifications) =>
      prevNotifications.filter((n) => n.id !== notificationId),
    );
    if (selectedNotifications.includes(notificationId)) {
      setSelectedNotifications((prevSelected) =>
        prevSelected.filter((id) => id !== notificationId),
      );
    }
    setSelectedNotification(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteSelectedNotifications = async () => {
    for (const notificationId of selectedNotifications) {
      await deleteNotification(notificationId);
    }
    setNotifications((prevNotifications) =>
      prevNotifications.filter((n) => !selectedNotifications.includes(n.id)),
    );
    setSelectedNotification(null);
    setSelectedNotifications([]);
    setIsBulkDeleteModalOpen(false);
  };

  const handleSelectNotification = (notificationId) => {
    setSelectedNotifications((prevSelected) =>
      prevSelected.includes(notificationId)
        ? prevSelected.filter((id) => id !== notificationId)
        : [...prevSelected, notificationId],
    );
  };

  const openDeleteModel = (notification) => {
    setSelectedNotification(notification);
    setIsDeleteModalOpen(true);
  };

  const openBulkDeleteModal = () => {
    setIsBulkDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const closeBulkDeleteModal = () => {
    setIsBulkDeleteModalOpen(false);
  };
  return (
    <div>
      {selectedNotifications.length > 0 && (
        <div className="selected-notifications-info">
          <Typography variant="h6">Số thông báo đã chọn: {selectedNotifications.length}</Typography>
          <Button variant="contained" color="error" onClick={openBulkDeleteModal}>
            Xóa các thông báo đã chọn
          </Button>
        </div>
      )}
      <div className="notification-page">
        <div className="sidebar">
          <h2>Thông báo</h2>

          <ul>
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`notification-item ${!notification.is_read ? 'unread' : ''} ${
                  selectedNotification && selectedNotification.id === notification.id
                    ? 'current'
                    : ''
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <Checkbox
                  checked={selectedNotifications.includes(notification.id)}
                  onChange={() => handleSelectNotification(notification.id)}
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="notification-title">{notification.title}</div>
                <div className="notification-time">
                  {new Date(notification.created_at).toLocaleString()}
                  {!notification.is_read && <span className="unread-dot"></span>}
                </div>
                {!notification.is_read && <span className="unread-dot"></span>}

                <button onClick={() => openDeleteModel(notification)}>xóa</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="main-screen">
          {selectedNotification ? (
            <>
              <h2>{selectedNotification.title}</h2>
              <h6>{new Date(selectedNotification.created_at).toLocaleString()}</h6>
              <hr />
              <p className="notification-message">{selectedNotification.message}</p>
            </>
          ) : (
            <p>Chọn thông báo để xem</p>
          )}
        </div>
        <div>
          <Modal
            open={isDeleteModalOpen}
            onClose={closeDeleteModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Xác nhận
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Bạn có chắc chắn muốn xóa thông báo này?
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button onClick={closeDeleteModal} sx={{ mr: 2 }}>
                  Hủy
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteNotification(selectedNotification)}
                >
                  Xác nhận
                </Button>
              </Box>
            </Box>
          </Modal>

          <Modal
            open={isBulkDeleteModalOpen}
            onClose={closeBulkDeleteModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Xác nhận
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Bạn có chắc chắn muốn xóa {selectedNotifications.length} thông báo đã chọn?
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button onClick={closeBulkDeleteModal} sx={{ mr: 2 }}>
                  Hủy
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDeleteSelectedNotifications}
                >
                  Xác nhận
                </Button>
              </Box>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;

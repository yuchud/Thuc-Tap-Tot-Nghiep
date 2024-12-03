import React, { useEffect, useState } from 'react';
import { Header, Icon, Avatar } from '@rneui/base';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { background } from 'native-base/lib/typescript/theme/styled-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import * as ImagePicker from 'react-native-image-picker';
import { API_URL } from '../../constants/API';
import { ListItem } from '@rneui/themed';
import { launchImageLibrary } from 'react-native-image-picker';
import { List } from 'native-base';
import { io } from 'socket.io-client';
//import { useState } from 'react';

const socket = io('http://localhost:3000');

export default function NotificationsScreen() {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);
  //const [useState, setUseState] = useState('');
  const fetchNotifications = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const decodedToken = jwtDecode(userToken);
      const { id } = decodedToken;
      const response = await fetch(`${API_URL}/notifications/account/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
        return;
      }
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  const handleNotificationClick = async (notification) => {
    navigation.navigate('notification_detail', { notification });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchNotifications();
    }, [])
  );

  useEffect(() => {
    fetchNotifications();
  }, []);

  // useEffect(() => {
  //   socket.on('connect', () => {
  //     console.log('Connected to server');
  //     const accountId = jwtDecode(AsyncStorage.getItem('userToken')).id;
  //     if (accountId) {
  //       socket.emit('join', accountId);
  //     }
  //   });

  //   socket.on('new_notification', (notification) => {
  //     setNotifications((prevNotifications) => [notification, ...prevNotifications]);
  //   });

  //   return () => {
  //     socket.off('new_notification');
  //     socket.off('connect');
  //   };
  // }, []);

  return (
    <View>
      <Header
        backgroundColor="#fff"
        backgroundImageStyle={{}}
        barStyle="default"
        centerComponent={{
          text: 'Thông báo',
          style: { color: '#000' },
        }}
        centerContainerStyle={{}}
        containerStyle={{ width: '100%' }}
        leftComponent={{
          icon: 'keyboard-backspace',
          color: '#f60143',
          onPress: () => navigation.goBack(),
        }}
        leftContainerStyle={{}}
        linearGradientProps={{}}
        placement="left"
        statusBarProps={{}}
      />
      {/* <ScrollView style={styles.container}>
        <ListItem bottomDivider onPress={() => {}}>
          <Icon name="account" type="material-community" color="grey" />
          <ListItem.Content>
            <ListItem.Title>Thông tin cá nhân</ListItem.Title>
            <ListItem.Subtitle>Xem và cập nhật thông tin cá nhân</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Subtitle>17/11/2024</ListItem.Subtitle>
          <ListItem.Chevron />
        </ListItem>
      </ScrollView> */}
      <View style={styles.notificationContainer}>
        <ScrollView>
          {notifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              onPress={() => handleNotificationClick(notification)}
              style={styles.notificationItem}
            >
              <Text style={[styles.notificationTitle, !notification.is_read && styles.unread]}>
                {notification.title}
              </Text>
              {!notification.is_read && (
                <Icon name="circle" type="font-awesome" color="red" size={10} containerStyle={styles.unreadDot} />
              )}
              <Text style={styles.notificationTime}>{new Date(notification.created_at).toLocaleString()}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = {
  notificationContainer: {
    backgroundColor: '#fff',
    height: '100%',
    padding: 20,
  },
  sidebar: {
    backgroundColor: '#fff',
    height: '100%',
  },
  notificationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  mainScreen: {
    padding: 20,
    backgroundColor: '#fff',
    height: '100%',
  },
  notificationMessage: {
    marginTop: 10,
  },

  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },

  container: {
    backgroundColor: '#eff',
    height: '100%',
  },
  avatar: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileBox: {
    height: '100%',
    backgroundColor: '#eff',
  },
  inputContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    height: '100%',
  },
  label: {
    alignSelf: 'flex-start',
    paddingLeft: 10,
    fontSize: 16,
  },
  input: {
    width: '90%',
    height: 40,
    marginLeft: 20,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  unreadDot: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
};

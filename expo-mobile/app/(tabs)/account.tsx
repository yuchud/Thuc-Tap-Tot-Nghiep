import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { Badge } from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { jwtDecode } from 'jwt-decode';
import { Icon } from 'react-native-elements';
import { format } from 'date-fns';
import { ListItem } from '@rneui/themed';
import { API_URL } from '../../constants/API';

export default function AccountScreen() {
  const [account, setAccount] = useState(null);
  const [fullName, setFullName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [badgeInfo, setBadgeInfo] = useState({});
  //const navigation = useNavigation();
  const fetchAccount = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const decodedToken = jwtDecode(userToken);
    const { id } = decodedToken;
    try {
      const response = await fetch(`${API_URL}/accounts/${id}`, {
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
      setAccount(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  const handleProfileButton = () => {
    //navigation.navigate('profile');
  };

  const handleChangePasswordButton = () => {
    //navigation.navigate('change_password');
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    //navigation.navigate('(login)');
  };

  const formatDateOnly = async (date) => {
    return format(new Date(date), 'dd/MM/yyyy');
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchAccount();
    }, [])
  );

  useEffect(() => {
    if (account) {
      console.log(account);
      if (account?.first_name && account?.last_name) {
        setFullName(`${account?.last_name} ${account?.first_name}`);
      } else {
        setFullName('Vô danh');
      }

      if (account.is_pro) {
        setBadgeInfo({
          status: 'success',
          value: 'Tài khoản pro ⭐',
        });
      } else {
        setBadgeInfo({
          status: 'primary',
          value: 'Tài khoản thường 👋',
        });
      }
      setAvatar(account.avatar_url);
    }
  }, [account]);
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Image source={avatar ? { uri: avatar } : require('../../assets/images/app_logo.png')} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{fullName}</Text>
          <Badge
            badgeStyle={{}}
            containerStyle={{}}
            status={badgeInfo.status}
            style={styles.badge}
            textProps={{}}
            textStyle={{ color: '#EFE' }}
            value={badgeInfo.value}
            options={{}}
          />
          {account?.is_pro && (
            <Text style={styles.expiredDateText}>
              Ngày hết hạn: {account?.pro_expired_at !== null ? account?.pro_expired_at : 'Chưa đăng ký'}
            </Text>
          )}
        </View>
      </View>
      <View>
        <ListItem bottomDivider onPress={handleProfileButton}>
          <Icon name="account" type="material-community" color="grey" />
          <ListItem.Content>
            <ListItem.Title>Thông tin cá nhân</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem onPress={handleChangePasswordButton}>
          <Icon name="form-textbox-password" type="material-community" color="grey" />
          <ListItem.Content>
            <ListItem.Title>Đổi mật khẩu</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem onPress={handleLogout}>
          <Icon name="logout" type="material-community" color="grey" />
          <ListItem.Content>
            <ListItem.Title>Đăng xuất</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    marginBottom: 10,
    marginLeft: 10,
    borderRadius: 50,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  name: {
    marginLeft: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },

  container: {
    paddingTop: 50,
    height: '100%',
    backgroundColor: '#eff',
  },

  label: {
    alignSelf: 'flex-start',
    paddingLeft: 10,
    fontSize: 16,
  },
  button: {
    marginVertical: 10,
    width: '80%',
  },
});

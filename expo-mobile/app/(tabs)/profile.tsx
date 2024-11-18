import React, { useEffect } from 'react';
import { Header, Icon, Avatar } from '@rneui/base';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { View, Text, TextInput } from 'react-native';
import { background } from 'native-base/lib/typescript/theme/styled-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import * as ImagePicker from 'react-native-image-picker';
import { API_URL } from '../../constants/API';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [avatar, setAvatar] = React.useState('');
  const [profile, setProfile] = React.useState({});
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const handleGetProfile = async () => {
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
      setProfile(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  const handleUpdateProfile = async () => {
    setError('');
    if (!username) {
      setError('Tên đăng nhập không được để trống');
      return;
    }

    if (email && !emailRegex.test(email)) {
      setError('Email không hợp lệ');
      return;
    }

    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const decodedToken = jwtDecode(userToken);
      const { id } = decodedToken;
      const response = await fetch(`${API_URL}/accounts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          username: username,
          email: email,
        }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        const errorJson = JSON.parse(errorText);
        alert(errorJson.message);
        return;
      }
      const data = await response.json();
      await handleGetProfile();
      alert('Cập nhật hồ sơ thành công');
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  const handleSelectAvatar = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
    });

    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else if (result.error) {
      console.log('ImagePicker Error: ', result.error);
    } else {
      const selectedImage = result.assets[0];
      setAvatar(`data:${selectedImage.type};base64,${selectedImage.base64}`);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      handleGetProfile();
    }, [])
  );

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name);
      setLastName(profile.last_name);
      setUsername(profile.username);
      setEmail(profile.email);
      setAvatar(profile.avatar_url);
    }
  }, [profile]);

  return (
    <View>
      <Header
        backgroundColor="#fff"
        backgroundImageStyle={{}}
        barStyle="default"
        centerComponent={{
          text: 'Sửa hồ sơ',
          style: { color: '#000' },
        }}
        centerContainerStyle={{}}
        containerStyle={{ width: '100%' }}
        leftComponent={{
          icon: 'keyboard-backspace',
          color: '#f60143',
          onPress: () => navigation.navigate('account'),
        }}
        leftContainerStyle={{}}
        linearGradientProps={{}}
        placement="left"
        rightComponent={{ icon: 'done', color: '#000', onPress: () => handleUpdateProfile() }}
        rightContainerStyle={{}}
        statusBarProps={{}}
      />
      <View style={styles.profileBox}>
        <View style={styles.avatar}>
          <Avatar
            activeOpacity={0.2}
            avatarStyle={{}}
            containerStyle={{ backgroundColor: '#BDBDBD' }}
            icon={{}}
            iconStyle={{}}
            imageProps={{}}
            onLongPress={() => alert('onLongPress')}
            onPress={handleSelectAvatar}
            overlayContainerStyle={{}}
            placeholderStyle={{}}
            rounded
            size="large"
            source={avatar ? { uri: avatar } : require('../../assets/images/app_logo.png')}
            title="P"
            titleStyle={{}}
          >
            <Avatar.Accessory size={23} />
          </Avatar>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Họ và tên đệm</Text>
          <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />
          <Text style={styles.label}>Tên</Text>
          <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />
          <Text style={styles.label}>Tên đăng nhập</Text>
          <TextInput style={styles.input} value={username} onChangeText={setUsername} />
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} />
          <Text style={{ color: 'red', marginLeft: 20 }}>{error}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = {
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
};

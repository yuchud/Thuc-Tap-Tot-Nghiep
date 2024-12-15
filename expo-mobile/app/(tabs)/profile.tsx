import React, { useEffect } from 'react';
import { Header, Icon, Avatar } from '@rneui/base';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { background } from 'native-base/lib/typescript/theme/styled-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
// import * as ImagePicker from 'react-native-image-picker';
import { API_URL } from '../../constants/API';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [avatar, setAvatar] = React.useState('');
  const [newAvatar, setNewAvatar] = React.useState<any>(null);
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

  const prepareFile = async (uri) => {
    if (uri.startsWith('file://')) {
      return await FileSystem.getContentUriAsync(uri);
    }
    return uri;
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

      const fileAvatar = {
        uri: await prepareFile(newAvatar.uri),
        type: newAvatar.type || 'image/jpeg',
        name: newAvatar.name || 'avatar.jpg',
      };

      const formData = new FormData();
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('username', username);
      formData.append('email', email);
      if (fileAvatar) {
        formData.append('file', {
          uri: fileAvatar.uri,
          type: fileAvatar.type,
          name: fileAvatar.name,
        });
      }
      console.log('fileAvatar:', fileAvatar);
      const response = await fetch(`${API_URL}/accounts/${id}`, {
        method: 'PUT',
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          // 'Content-Type': 'multipart/form-data',
        },

        body: formData,
      });
      // console.log('response:', response);

      // const response = await fetch(`${API_URL}/accounts/${id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     first_name: firstName,
      //     last_name: lastName,
      //     username: username,
      //     email: email,
      //   }),
      // });

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

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    console.log(result);

    if (!result.canceled) {
      const pickedAsset = result.assets[0]; // Get the first selected asset
      setNewAvatar({
        uri: pickedAsset.uri,
        type: pickedAsset.type || 'image/jpeg', // Default to 'image/jpeg' if type is undefined
        name: pickedAsset.fileName || 'avatar.jpg', // Default to 'avatar.jpg' if fileName is undefined
      });
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
        <View>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={{
                uri: newAvatar?.uri || avatar,
              }}
              style={styles.avatar}
            />
            {/* <Avatar.Accessory size={23} /> */}
            <Text style={styles.changeAvatarText}>Change Avatar</Text>
          </TouchableOpacity>
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
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 8,
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
  changeAvatarText: {
    textAlign: 'center',
    color: 'blue',
    fontSize: 14,
    marginBottom: 16,
  },
};

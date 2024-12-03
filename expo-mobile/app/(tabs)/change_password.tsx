import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header } from 'react-native-elements';
import { jwtDecode } from 'jwt-decode';
import background from 'native-base/lib/typescript/theme/styled-system';
import { Button, Icon } from '@rneui/base';
import { API_URL } from '../../constants/API';

export default function ChangePasswordScreen() {
  //const navigation = useNavigation();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleChangePassword = async () => {
    setError('');
    if (newPassword.trim().length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Mật khẩu mới không khớp');
      return;
    }

    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const decodedToken = jwtDecode(userToken);
      const { id } = decodedToken;
      const response = await fetch(`${API_URL}/accounts/${id}/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: newPassword,
        }),
      });
      if (!response.ok) {
        alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
        return;
      }

      alert('Đổi mật khẩu thành công');
      //navigation.navigate('account');
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

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
          onPress: () => {},
          // navigation.navigate('account'),
        }}
        leftContainerStyle={{}}
        // linearGradientProps={{}}
        placement="left"
        // rightComponent={{ icon: 'done', color: '#000', onPress: () => handleUpdateProfile() }}
        // rightContainerStyle={{}}
        statusBarProps={{}}
      />
      <View style={styles.inputContainer}>
        {/* <TextInput placeholder="Mật khẩu cũ" secureTextEntry={true} value={oldPassword} onChangeText={setOldPassword} /> */}
        <Text style={styles.label}>Mật khẩu mới</Text>
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu mới"
          secureTextEntry={true}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <Text style={styles.label}>Nhập lại mật khẩu mới</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập lại mật khẩu mới"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Text style={{ color: 'red' }}>{error}</Text>
        <View style={{ width: '50%' }}>
          <Button onPress={handleChangePassword} radius={'sm'} type="solid">
            Đổi mật khẩu
            <Icon name="edit" color="white" />
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = {
  inputContainer: {
    padding: 20,
    backgroundColor: '#eff',
    height: '100%',
  },
  label: {
    marginTop: 10,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  button: {
    width: 200,
  },
};

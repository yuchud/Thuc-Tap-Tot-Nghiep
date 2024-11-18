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
import { Divider } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';
//import { useState } from 'react';

export default function NotificationDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { notification } = route.params;

  useFocusEffect(
    React.useCallback(() => {
      console.log('NotificationDetailScreen -> notification', notification);
    }, [])
  );

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <Header
        backgroundColor="#eff"
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
          onPress: () => navigation.navigate('notifications'),
        }}
        leftContainerStyle={{}}
        linearGradientProps={{}}
        placement="left"
        statusBarProps={{}}
      />
      <View style={styles.mainScreen}>
        <ScrollView>
          <Text style={styles.title}>{notification.title}</Text>
          <Text>{new Date(notification.created_at).toLocaleString()}</Text>
          <Divider />
          <Text>{notification.message}</Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '100%',
  },
  mainScreen: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
};

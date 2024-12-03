import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { PricingCard, lightColors } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { API_URL } from '../../constants/API';
import { useNavigation } from '@react-navigation/native';
export default function PricingScreen() {
  const [proPlans, setProPlans] = useState([]);
  const navigation = useNavigation();
  const fetchProPlans = async () => {
    try {
      const response = await fetch(`${API_URL}/pro-plans/public`, {
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
      //   console.log(data);
      setProPlans(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };
  const handlePurchaseProPlan = async (proPlanId) => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const decodedToken = jwtDecode(userToken);
      const { id } = decodedToken;
      const response = await fetch(`${API_URL}/pro-plans/${proPlanId}/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ account_id: id }),
      });
      console.log(response);
      if (!response.ok) {
        alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
        return;
      }
      const data = await response.json();
      console.log(data);
      alert('Mua thành công');
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  const handlePaymentPress = async () => {
    navigation.navigate('payment');
  };

  const formatPrice = (price) => {
    if (price.endsWith('.00')) {
      return price.slice(0, -3);
    }
  };

  useEffect(() => {
    fetchProPlans();
  }, []);
  return (
    <>
      <ScrollView style={styles.pricingContainer}>
        {proPlans.map((proPlan) => (
          <PricingCard
            key={proPlan.id}
            color={proPlan.is_recommend ? lightColors.secondary : lightColors.primary}
            title={proPlan.name}
            price={`${formatPrice(proPlan.price_per_month)}đ / tháng`}
            info={proPlan.description.split('.').map((line) => line.trim())}
            button={{ title: 'Mua ngay', icon: 'attach-money', onPress: () => handlePaymentPress() }}
          />
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  pricingContainer: {
    padding: 20,
    backgroundColor: '#eff',
  },
});

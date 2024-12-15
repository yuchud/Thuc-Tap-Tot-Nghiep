import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { PricingCard, lightColors } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { API_URL } from '../../constants/API';
import { useNavigation } from '@react-navigation/native';

import { useStripe } from '@stripe/stripe-react-native';

export default function PricingScreen() {
  const [proPlans, setProPlans] = useState([]);
  const navigation = useNavigation();

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async (proPlan) => {
    const response = await fetch(`${API_URL}/payment/payment-sheet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: proPlan.price_per_month * proPlan.month_count }),
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();
    console.log('response:', response);
    console.log('response.json():', response.json());
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async (proPlan) => {
    const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams(proPlan);

    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async (proPlan) => {
    await initializePaymentSheet(proPlan);
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert('Thông báo', `Thanh toán thất bại!`);
    } else {
      try {
        await handlePurchaseProPlan(proPlan.id);
        Alert.alert('Success', `Thanh toán thành công!`);
      } catch (error) {
        console.error('Error:', error);
        alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
      }
    }
  };

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
      if (!response.ok) {
        alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
        return;
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  const handlePaymentPress = async () => {
    navigation.navigate('payment');
  };

  const formatPrice = (price) => {
    price = price.toString();
    return price;
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
            price={`${formatPrice(proPlan.price_per_month * proPlan.month_count)}đ`}
            info={proPlan.description.split('.').map((line) => line.trim())}
            button={{ title: 'Mua ngay', icon: 'attach-money', onPress: () => openPaymentSheet(proPlan) }}
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

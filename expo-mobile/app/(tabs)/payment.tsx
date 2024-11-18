import React from 'react';
import { CardField, useStripe, CardForm } from '@stripe/stripe-react-native';
import { Button, View, StyleSheet, Text } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
export default function PaymentScreen() {
  const { confirmPayment } = useStripe();
  const handlePayPress = async () => {};

  return (
    <StripeProvider publishableKey="pk_test_51QJ91mGM0vTUWuMmjrkAH7FXcX2CdIB7qyfZN9zPJsMqzGWbKIgU6GLoxMjSa9dheQNs27J2CNsgJhkwE9besXMg00cSQ34N1N">
      <View style={styles.container}>
        <CardForm
          postalCodeEnabled={false}
          placeholder={{
            number: '4242 4242 4242 4242',
            expiration: 'MM/YY',
            cvc: 'CVC',
          }}
          cardStyle={{
            backgroundColor: '#ffffff', // Set the background color here
            textColor: '#000000',
            placeholderColor: '#888888',
            borderWidth: 1,
            borderColor: '#000000',
            borderRadius: 8,

          }}
          style={{
            width: '100%',
            height: 200,
            marginVertical: 30,
          }}
          onCardChange={(cardDetails) => {
            console.log('cardDetails', cardDetails);
          }}
          onFocus={(focusedField) => {
            console.log('focusField', focusedField);
          }}
        />
        <Button onPress={handlePayPress} title="Pay" />
      </View>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eff',
    height: '100%',
  },
});

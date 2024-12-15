const express = require('express');
const router = express.Router();
const stripe = require('stripe')(
  'sk_test_51QJ91mGM0vTUWuMmrjcuWb6y1NpwimRhTQkJJC0BLEHMhB1TYALaDxsJLqkqiAfRTVLuayjR2wk9HisUlYJCKwYZ00eDsPBDPC'
);
// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

router.post('/payment-sheet', async (req, res) => {
  const amount = req.body.amount || 100000;
  const currency = req.body.currency || 'vnd';
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: '2024-11-20.acacia' }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: currency,
    customer: customer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter
    // is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey:
      'pk_test_51QJ91mGM0vTUWuMmjrkAH7FXcX2CdIB7qyfZN9zPJsMqzGWbKIgU6GLoxMjSa9dheQNs27J2CNsgJhkwE9besXMg00cSQ34N1N',
  });
});

module.exports = router;

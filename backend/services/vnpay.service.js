const axios = require('axios');

const VNPAY_API_URL = 'http://localhost:8888/order/';

const vnpayService = {
  createPaymentUrl: async (amount, bank_code, order_id) => {
    try {
      const response = await axios.post(`${VNPAY_API_URL}/create_payment_url`, {
        amount,
        bank_code,
        language: 'vn',
        order_id,
      });
      return response.data;
    } catch (error) {
      return error;
    }
  },
};

module.exports = vnpayService;

const http = require('http-status-codes');
const VnpayService = require('../services/vnpay.service');

const vnpayController = {
  async createPaymentUrl(req, res) {
    try {
      const { amount, bank_code, order_id } = req.body;
      const vnpayUrl = await VnpayService.createPaymentUrl(amount, bank_code, order_id);
      if (!vnpayUrl) {
        return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Lỗi khi tạo URL thanh toán' });
      }
      return res.status(http.StatusCodes.OK).json({ paymentUrl: vnpayUrl });
    } catch (error) {
      console.error(error);
      return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Lỗi server' });
    }
  },
};

module.exports = vnpayController;

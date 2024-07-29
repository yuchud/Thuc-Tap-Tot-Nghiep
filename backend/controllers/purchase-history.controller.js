const purchaseHistoryService = require('../services/purchase-history.service');
const accountModel = require('../models/account.model');

const http = require('http-status-codes');

const purchaseHistoryController = {
  getPurchaseHistory: async (req, res) => {
    try {
      const account_id = req.params.account_id;
      const purchaseHistory = await purchaseHistoryService.getPurchaseHistory(account_id);
      if (!purchaseHistory) {
        return res.status(http.StatusCodes.NOT_FOUND).json({ error: 'Không tìm thấy lịch sử mua gói' });
      }
      return res.status(http.StatusCodes.OK).json(purchaseHistory);
    } catch (error) {
      console.error(error);
      return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Lỗi server' });
    }
  },
};

module.exports = purchaseHistoryController;

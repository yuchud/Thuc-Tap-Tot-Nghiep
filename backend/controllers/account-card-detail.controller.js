const accountCardDetailService = require('../services/account-card-detail.service');
const http = require('http-status-codes');
const accountCardDetailController = {
  getAccountCardDetails: async (req, res) => {
    try {
      const accountCardDetails = await accountCardDetailService.getAccountCardDetails();
      return res.status(http.StatusCodes.OK).json(accountCardDetails);
    } catch (error) {
      return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
};

module.exports = accountCardDetailController;

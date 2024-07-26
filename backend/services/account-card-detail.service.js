const AccountCardDetailModel = require('../models/account-card-detail.model');
const accountCardDetail = {
  getAccountCardDetails: async () => {
    return await AccountCardDetailModel.findAll();
  },
};

module.exports = accountCardDetail;

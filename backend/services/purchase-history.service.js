const purchaseHistoryModel = require('../models/purchase-history.model');
const accountModel = require('../models/account.model');
const proPlanModel = require('../models/pro-plan.model');
const { Op, or } = require('sequelize');

const purchaseHistoryService = {
  getPurchaseHistory: async (accountId) => {
    try {
      const purchaseHistory = await purchaseHistoryModel.findAll({
        where: {
          account_id: accountId,
        },
        order: [['purchased_at', 'DESC']],
      });

      if (!purchaseHistory) {
        return null;
      }

      for (let i = 0; i < purchaseHistory.length; i++) {
        const proPlan = await proPlanModel.findByPk(purchaseHistory[i].pro_plan_id);
        purchaseHistory[i].dataValues.pro_plan_name = proPlan.name;
      }
      return purchaseHistory;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

module.exports = purchaseHistoryService;

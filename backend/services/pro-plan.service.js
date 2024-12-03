const ProPlanModel = require('../models/pro-plan.model');
const { addMonth } = require('../utils/date.util');
const sequelize = require('../db-connection');
const AccountModel = require('../models/account.model');
const purchaseHistoryModel = require('../models/purchase-history.model');
const notificationService = require('./notification.service');

const proPlansService = {
  getAllProPlans: async (is_public = null) => {
    try {
      let whereClause = {};
      if (is_public !== null) {
        whereClause = { is_public: is_public };
      }
      const proPlans = await ProPlanModel.findAll({
        where: whereClause,
      });
      return proPlans;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getProPlanById: async (id) => {
    try {
      const proPlan = await ProPlanModel.findByPk(id);
      return proPlan;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  createProPlan: async (proPlanData) => {
    try {
      const proPlan = await ProPlanModel.create(proPlanData);
      return proPlan;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  updateProPlan: async (id, proPlanData) => {
    try {
      const proPlan = await ProPlanModel.findByPk(id);
      if (!proPlan) {
        return null;
      }
      await proPlan.update(proPlanData);
      return proPlan;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  deleteProPlan: async (id) => {
    try {
      const proPlan = await ProPlanModel.findByPk(id);
      if (!proPlan) {
        return null;
      }
      await proPlan.destroy();
      return proPlan;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  purchaseProPlan: async (proPlanId, accountId) => {
    const transaction = await sequelize.transaction();

    try {
      const proPlan = await ProPlanModel.findByPk(proPlanId);
      if (!proPlan) {
        throw new Error('Không tìm thấy Pro Plan');
      }

      const account = await AccountModel.findByPk(accountId);
      if (!account) {
        throw new Error('Không tìm thấy tài khoản');
      }

      const currentDate = new Date();
      let pro_expired_at = new Date(account.pro_expired_at);
      // console.log(pro_expired_at, currentDate, pro_expired_at > currentDate);
      if (pro_expired_at > currentDate) {
        pro_expired_at = addMonth(pro_expired_at, proPlan.month_count);
      } else {
        pro_expired_at = addMonth(currentDate, proPlan.month_count);
      }

      // console.log(pro_expired_at);
      await account.update(
        {
          is_pro: true,
          pro_expired_at: pro_expired_at,
        },
        {
          transaction,
        }
      );

      await purchaseHistoryModel.create(
        {
          account_id: accountId,
          pro_plan_id: proPlanId,
          purchased_amount: proPlan.price_per_month * proPlan.month_count,
          purchased_at: currentDate,
        },
        { transaction }
      );
      const title = 'Mua gói Pro thành công';

      const message = `Bạn đã mua thành công gói ${proPlan.name} với số tiền ${
        proPlan.price_per_month * proPlan.month_count
      }\nTài khoản Pro của bạn sẽ hết hạn vào: ${pro_expired_at.toLocaleDateString()}.`;

      await transaction.commit();

      await notificationService.sendNotificationToAccounts(null, [accountId], title, message);
      return true;
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      throw new Error(error.message);
    }
  },
};

module.exports = proPlansService;

const cron = require('node-cron');
const AccountModel = require('../models/account.model');
const { Op } = require('sequelize');

const proPlanExpirationJob = {
  checkProPlanExpiration: async () => {
    try {
      const currentDate = new Date();
      const expiredAccounts = await AccountModel.findAll({
        where: {
          pro_expired_at: {
            [Op.lte]: currentDate,
          },
        },
        is_pro: true,
      });

      for (const account of expiredAccounts) {
        account.is_pro = false;
        await account.save();
      }
    } catch (error) {
      console.error(error);
    }
  },
};

checkProPlanExpired: async() => {
  try {
    const currentDate = new Date();
    const expiredAccounts = await AccountModel.findAll({
      where: {
        pro_expired_at: {
          [Op.lte]: currentDate,
        },
        is_pro: true,
      },
    });
  }
  catch (error) {
    console.error(error);
  }
}
cron.schedule('0 0 * * *', async () => {
  proPlanExpirationJob.checkProPlanExpiration();
});

module.exports = proPlanExpirationJob;

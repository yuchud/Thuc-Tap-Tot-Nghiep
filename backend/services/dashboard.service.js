const PurchaseHistoriesModel = require('../models/purchase-history.model');
const { Op } = require('sequelize');
const sequelize = require('sequelize');
const dateUtil = require('../utils/date.util');
const ProPlansModel = require('../models/pro-plan.model');
const AccountsModel = require('../models/account.model');

const DashboardService = {
  getRevenueDailyInMonth: async (year, month) => {
    try {
      const revenue = await PurchaseHistoriesModel.findAll({
        attributes: [
          [sequelize.fn('DAY', sequelize.col('purchased_at')), 'day'],
          [sequelize.fn('SUM', sequelize.col('purchased_amount')), 'total_revenue'],
        ],
        where: {
          purchased_at: {
            [Op.between]: [`${year}-${month}-01`, `${year}-${month}-31`],
          },
        },
        group: [sequelize.fn('DAY', sequelize.col('purchased_at'))],
        order: [[sequelize.fn('DAY', sequelize.col('purchased_at'))]],
      });
      return revenue;
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  getRevenueMonthlyInYear: async (year) => {
    try {
      const revenue = await PurchaseHistoriesModel.findAll({
        attributes: [
          [sequelize.fn('MONTH', sequelize.col('purchased_at')), 'month'],
          [sequelize.fn('SUM', sequelize.col('purchased_amount')), 'total_revenue'],
        ],
        where: {
          purchased_at: {
            [Op.between]: [`${year}-01-01`, `${year}-12-31`],
          },
        },
        group: [sequelize.fn('MONTH', sequelize.col('purchased_at'))],
        order: [[sequelize.fn('MONTH', sequelize.col('purchased_at'))]],
      });
      return revenue;
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  getRevenueInMonth: async (year, month) => {
    try {
      const revenue = await PurchaseHistoriesModel.findAll({
        attributes: [[sequelize.fn('SUM', sequelize.col('purchased_amount')), 'total_revenue']],
        where: {
          purchased_at: {
            [Op.between]: [`${year}-${month}-01`, `${year}-${month}-31`],
          },
        },
      });

      revenue[0].dataValues.total_revenue = revenue[0].dataValues.total_revenue || 0;

      const previousMonth = dateUtil.getPreviousMonth(year, month);
      console.log(previousMonth);
      const previousRevenue = await PurchaseHistoriesModel.findAll({
        attributes: [[sequelize.fn('SUM', sequelize.col('purchased_amount')), 'total_revenue']],
        where: {
          purchased_at: {
            [Op.between]: [
              `${previousMonth.year}-${previousMonth.month}-01`,
              `${previousMonth.year}-${previousMonth.month}-31`,
            ],
          },
        },
      });
      revenue[0].dataValues.total_revenue_previous_month = previousRevenue[0].dataValues.total_revenue || 0;
      revenue[0].dataValues.difference_from_previous_month =
        revenue[0].dataValues.total_revenue - previousRevenue[0].dataValues.total_revenue;

      const floatTotalRevenue = parseFloat(revenue[0].dataValues.total_revenue);
      const floatTotalRevenuePreviousMonth = parseFloat(revenue[0].dataValues.total_revenue_previous_month);
      const totalRevenueTwoMonths = floatTotalRevenue + floatTotalRevenuePreviousMonth;

      if (totalRevenueTwoMonths === 0) {
        revenue[0].dataValues.percent_of_total_revenue = 0;
        revenue[0].dataValues.percent_of_total_revenue_previous_month = 0;
      } else {
        revenue[0].dataValues.percent_of_total_revenue = parseFloat(
          ((floatTotalRevenue / totalRevenueTwoMonths) * 100).toFixed(2)
        );
        revenue[0].dataValues.percent_of_total_revenue_previous_month = parseFloat(
          ((floatTotalRevenuePreviousMonth / totalRevenueTwoMonths) * 100).toFixed(2)
        );
      }

      return revenue;
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  getRevenueInYear: async (year) => {
    try {
      const revenue = await PurchaseHistoriesModel.findAll({
        attributes: [[sequelize.fn('SUM', sequelize.col('purchased_amount')), 'total_revenue']],
        where: {
          purchased_at: {
            [Op.between]: [`${year}-01-01`, `${year}-12-31`],
          },
        },
      });

      revenue[0].dataValues.total_revenue = revenue[0].dataValues.total_revenue || 0;

      const previousYear = year - 1;
      const previousRevenue = await PurchaseHistoriesModel.findAll({
        attributes: [[sequelize.fn('SUM', sequelize.col('purchased_amount')), 'total_revenue']],
        where: {
          purchased_at: {
            [Op.between]: [`${previousYear}-01-01`, `${previousYear}-12-31`],
          },
        },
      });
      revenue[0].dataValues.total_revenue_previous_year = previousRevenue[0].dataValues.total_revenue || 0;
      revenue[0].dataValues.difference_from_previous_year =
        revenue[0].dataValues.total_revenue - previousRevenue[0].dataValues.total_revenue;
      const floatTotalRevenue = parseFloat(revenue[0].dataValues.total_revenue);
      const floatTotalRevenuePreviousYear = parseFloat(revenue[0].dataValues.total_revenue_previous_year);
      const totalRevenueTwoYears = floatTotalRevenue + floatTotalRevenuePreviousYear;

      if (totalRevenueTwoYears === 0) {
        revenue[0].dataValues.percent_of_total_revenue = 0;
        revenue[0].dataValues.percent_of_total_revenue_previous_year = 0;
      } else {
        revenue[0].dataValues.percent_of_total_revenue = parseFloat(
          ((floatTotalRevenue / totalRevenueTwoYears) * 100).toFixed(2)
        );
        revenue[0].dataValues.percent_of_total_revenue_previous_year = parseFloat(
          ((floatTotalRevenuePreviousYear / totalRevenueTwoYears) * 100).toFixed(2)
        );
      }
      return revenue;
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  getTotalProPlansPurchaseOfEachTypeInYear: async (year) => {
    try {
      const proPlansPurchase = await PurchaseHistoriesModel.findAll({
        attributes: [
          'pro_plan_id',
          [sequelize.fn('COUNT', sequelize.col('pro_plan_id')), 'total_purchase'],
          [sequelize.fn('SUM', sequelize.col('purchased_amount')), 'total_revenue'],
        ],
        where: {
          purchased_at: {
            [Op.between]: [`${year}-01-01`, `${year}-12-31`],
          },
        },
        group: ['pro_plan_id'],
      });
      for (let i = 0; i < proPlansPurchase.length; i++) {
        const proPlan = await ProPlansModel.findByPk(proPlansPurchase[i].dataValues.pro_plan_id);
        proPlansPurchase[i].dataValues.pro_plan_name = proPlan.name;
      }

      return proPlansPurchase;
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  getTopProPlansRevenueInMonth: async (year, month) => {
    try {
      const proPlansPurchase = await PurchaseHistoriesModel.findAll({
        attributes: [
          'pro_plan_id',
          [sequelize.fn('SUM', sequelize.col('purchased_amount')), 'total_revenue'],
          [sequelize.fn('COUNT', sequelize.col('pro_plan_id')), 'total_purchase'],
        ],
        where: {
          purchased_at: {
            [Op.between]: [`${year}-${month}-01`, `${year}-${month}-31`],
          },
        },
        group: ['pro_plan_id'],
        order: [[sequelize.fn('SUM', sequelize.col('purchased_amount')), 'DESC']],
      });

      for (let i = 0; i < proPlansPurchase.length; i++) {
        const proPlan = await ProPlansModel.findByPk(proPlansPurchase[i].dataValues.pro_plan_id);
        proPlansPurchase[i].dataValues.pro_plan_name = proPlan.name;
      }

      return proPlansPurchase;
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  getTopProPlansRevenueInYear: async (year) => {
    try {
      const proPlansPurchase = await PurchaseHistoriesModel.findAll({
        attributes: [
          'pro_plan_id',
          [sequelize.fn('SUM', sequelize.col('purchased_amount')), 'total_revenue'],
          [sequelize.fn('COUNT', sequelize.col('pro_plan_id')), 'total_purchase'],
        ],
        where: {
          purchased_at: {
            [Op.between]: [`${year}-01-01`, `${year}-12-31`],
          },
        },
        group: ['pro_plan_id'],
        order: [[sequelize.fn('SUM', sequelize.col('purchased_amount')), 'DESC']],
      });

      for (let i = 0; i < proPlansPurchase.length; i++) {
        const proPlan = await ProPlansModel.findByPk(proPlansPurchase[i].dataValues.pro_plan_id);
        proPlansPurchase[i].dataValues.pro_plan_name = proPlan.name;
      }

      return proPlansPurchase;
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  getCreatedAccountsInMonth: async (year, month) => {
    try {
      const accounts = await AccountsModel.findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'total_created_accounts']],
        where: {
          created_at: {
            [Op.between]: [`${year}-${month}-01`, `${year}-${month}-31`],
          },
        },
      });

      const previousMonth = dateUtil.getPreviousMonth(year, month);
      const previousAccounts = await AccountsModel.findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'total_created_accounts']],
        where: {
          created_at: {
            [Op.between]: [
              `${previousMonth.year}-${previousMonth.month}-01`,
              `${previousMonth.year}-${previousMonth.month}-31`,
            ],
          },
        },
      });

      accounts[0].dataValues.total_created_accounts = accounts[0].dataValues.total_created_accounts || 0;
      accounts[0].dataValues.total_created_accounts_previous_month =
        previousAccounts[0].dataValues.total_created_accounts || 0;
      accounts[0].dataValues.difference_from_previous_month =
        accounts[0].dataValues.total_created_accounts - previousAccounts[0].dataValues.total_created_accounts;

      const floatTotalCreatedAccounts = parseFloat(accounts[0].dataValues.total_created_accounts);
      const floatTotalCreatedAccountsPreviousMonth = parseFloat(
        accounts[0].dataValues.total_created_accounts_previous_month
      );
      const totalCreatedAccountsTwoMonths = floatTotalCreatedAccounts + floatTotalCreatedAccountsPreviousMonth;

      if (totalCreatedAccountsTwoMonths === 0) {
        accounts[0].dataValues.percent_of_total_created_accounts = 0;
        accounts[0].dataValues.percent_of_total_created_accounts_previous_month = 0;
      } else {
        accounts[0].dataValues.percent_of_total_created_accounts = parseFloat(
          ((floatTotalCreatedAccounts / totalCreatedAccountsTwoMonths) * 100).toFixed(2)
        );
        accounts[0].dataValues.percent_of_total_created_accounts_previous_month = parseFloat(
          ((floatTotalCreatedAccountsPreviousMonth / totalCreatedAccountsTwoMonths) * 100).toFixed(2)
        );
      }
      return accounts;
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  getCreatedAccountsInYear: async (year) => {
    try {
      const accounts = await AccountsModel.findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'total_created_accounts']],
        where: {
          created_at: {
            [Op.between]: [`${year}-01-01`, `${year}-12-31`],
          },
        },
      });

      const previousYear = year - 1;
      const previousAccounts = await AccountsModel.findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'total_created_accounts']],
        where: {
          created_at: {
            [Op.between]: [`${previousYear}-01-01`, `${previousYear}-12-31`],
          },
        },
      });

      accounts[0].dataValues.total_created_accounts = accounts[0].dataValues.total_created_accounts || 0;
      accounts[0].dataValues.total_created_accounts_previous_year =
        previousAccounts[0].dataValues.total_created_accounts || 0;
      accounts[0].dataValues.difference_from_previous_year =
        accounts[0].dataValues.total_created_accounts - previousAccounts[0].dataValues.total_created_accounts;

      const floatTotalCreatedAccounts = parseFloat(accounts[0].dataValues.total_created_accounts);
      const floatTotalCreatedAccountsPreviousYear = parseFloat(
        accounts[0].dataValues.total_created_accounts_previous_year
      );
      const totalCreatedAccountsTwoYears = floatTotalCreatedAccounts + floatTotalCreatedAccountsPreviousYear;

      if (totalCreatedAccountsTwoYears === 0) {
        accounts[0].dataValues.percent_of_total_created_accounts = 0;
        accounts[0].dataValues.percent_of_total_created_accounts_previous_year = 0;
      } else {
        accounts[0].dataValues.percent_of_total_created_accounts = parseFloat(
          ((floatTotalCreatedAccounts / totalCreatedAccountsTwoYears) * 100).toFixed(2)
        );
        accounts[0].dataValues.percent_of_total_created_accounts_previous_year = parseFloat(
          ((floatTotalCreatedAccountsPreviousYear / totalCreatedAccountsTwoYears) * 100).toFixed(2)
        );
      }
      return accounts;
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  getCreatedAccountsDailyInMonth: async (year, month) => {
    try {
      const accounts = await AccountsModel.findAll({
        attributes: [
          [sequelize.fn('DAY', sequelize.col('created_at')), 'day'],
          [sequelize.fn('COUNT', sequelize.col('id')), 'total_created_accounts'],
        ],
        where: {
          created_at: {
            [Op.between]: [`${year}-${month}-01`, `${year}-${month}-31`],
          },
        },
        group: [sequelize.fn('DAY', sequelize.col('created_at'))],
        order: [[sequelize.fn('DAY', sequelize.col('created_at'))]],
      });
      return accounts;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};

module.exports = DashboardService;

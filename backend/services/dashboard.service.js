const PurchaseHistoriesModel = require('../models/purchase-history.model');
const { Op } = require('sequelize');
const sequelize = require('sequelize');
const dateUtil = require('../utils/date.util');
const ProPlansModel = require('../models/pro-plan.model');
const AccountsModel = require('../models/account.model');
const LearnStreak = require('../models/learn-streak.model');

const DashboardService = {
  getRevenueDailyInMonth: async (year, month) => {
    try {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      const revenue = await PurchaseHistoriesModel.findAll({
        attributes: [
          [sequelize.fn('DAY', sequelize.col('purchased_at')), 'day'],
          [sequelize.fn('SUM', sequelize.col('purchased_amount')), 'total_revenue'],
        ],
        where: {
          purchased_at: {
            [Op.between]: [startDate, endDate],
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
      // console.log(revenue);
      return revenue;
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  getRevenueInMonth: async (year, month) => {
    try {
      console.log(year, month);
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      const revenue = await PurchaseHistoriesModel.findAll({
        attributes: [[sequelize.fn('SUM', sequelize.col('purchased_amount')), 'total_revenue']],
        where: {
          purchased_at: {
            [Op.between]: [startDate, endDate],
          },
        },
      });

      revenue[0].dataValues.total_revenue = revenue[0].dataValues.total_revenue || 0;

      const previousMonth = dateUtil.getPreviousMonth(year, month);
      const previousStartDate = new Date(previousMonth.year, previousMonth.month - 1, 1);
      const previousEndDate = new Date(previousMonth.year, previousMonth.month, 0);
      const previousRevenue = await PurchaseHistoriesModel.findAll({
        attributes: [[sequelize.fn('SUM', sequelize.col('purchased_amount')), 'total_revenue']],
        where: {
          purchased_at: {
            [Op.between]: [previousStartDate, previousEndDate],
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
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      const proPlansPurchase = await PurchaseHistoriesModel.findAll({
        attributes: [
          'pro_plan_id',
          [sequelize.fn('SUM', sequelize.col('purchased_amount')), 'total_revenue'],
          [sequelize.fn('COUNT', sequelize.col('pro_plan_id')), 'total_purchase'],
        ],
        where: {
          purchased_at: {
            [Op.between]: [startDate, endDate],
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
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      const accounts = await AccountsModel.findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'total_created_accounts']],
        where: {
          created_at: {
            [Op.between]: [startDate, endDate],
          },
        },
      });

      const previousMonth = dateUtil.getPreviousMonth(year, month);
      const previousStartDate = new Date(previousMonth.year, previousMonth.month - 1, 1);
      const previousEndDate = new Date(previousMonth.year, previousMonth.month, 0);
      const previousAccounts = await AccountsModel.findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'total_created_accounts']],
        where: {
          created_at: {
            [Op.between]: [previousStartDate, previousEndDate],
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
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      const accounts = await AccountsModel.findAll({
        attributes: [
          [sequelize.fn('DAY', sequelize.col('created_at')), 'day'],
          [sequelize.fn('COUNT', sequelize.col('id')), 'total_created_accounts'],
        ],
        where: {
          created_at: {
            [Op.between]: [startDate, endDate],
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
  getTopCurrentLearnStreaks: async (top) => {
    try {
      if (top === undefined) {
        top = 10;
      }

      const streaks = await LearnStreak.findAll({
        attributes: ['account_id', [sequelize.literal('current_learned_day_streak'), 'value']],
        order: [['current_learned_day_streak', 'DESC']],
        where: { current_learned_day_streak: { [Op.gt]: 0 } },
        limit: top,
      });

      const streaksWithFullname = await Promise.all(
        streaks.map(async (streak, index) => {
          const account = await AccountsModel.findByPk(streak.account_id);
          const full_name = account.last_name + ' ' + account.first_name;
          return {
            rank: index + 1,
            ...streak.toJSON(),
            full_name: full_name === 'null null' ? 'Vô danh' : full_name,
          };
        })
      );
      return streaksWithFullname;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  getTopLongestLearnStreaks: async (top) => {
    try {
      if (top === undefined) {
        top = 10;
      }
      const streaks = await LearnStreak.findAll({
        attributes: ['account_id', [sequelize.literal('longest_learned_day_streak'), 'value']],
        order: [['longest_learned_day_streak', 'DESC']],
        limit: top,
      });
      const streaksWithFullname = await Promise.all(
        streaks.map(async (streak, index) => {
          const account = await AccountsModel.findByPk(streak.account_id);
          const full_name = account.last_name + ' ' + account.first_name;
          return {
            rank: index + 1,
            ...streak.toJSON(),
            full_name: full_name === 'null null' ? 'Vô danh' : full_name,
          };
        })
      );
      return streaksWithFullname;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  getTopLearnedCardsCount: async (top) => {
    try {
      if (top === undefined) {
        top = 10;
      }
      const topLearnedCardsCount = await AccountsModel.findAll({
        attributes: ['id', [sequelize.literal('learned_card_count'), 'value'], 'last_name', 'first_name'],
        order: [['learned_card_count', 'DESC']],
        where: { learned_card_count: { [Op.gt]: 0 } },
        limit: top,
      });
      const topLearnedCardsCountWithFullname = await Promise.all(
        topLearnedCardsCount.map(async (data, index) => {
          const full_name = data.last_name + ' ' + data.first_name;
          return {
            rank: index + 1,
            ...data.toJSON(),
            full_name: full_name === 'null null' ? 'Vô danh' : full_name,
          };
        })
      );

      return topLearnedCardsCountWithFullname;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
};

module.exports = DashboardService;

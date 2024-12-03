const { get } = require('../routes/dashboard.routes');
const dashboardService = require('../services/dashboard.service');
const http = require('http-status-codes');
const dashboardController = {
  getRevenueDailyInMonth: async (req, res) => {
    try {
      const year = req.params.year;
      const month = req.params.month;
      const revenue = await dashboardService.getRevenueDailyInMonth(year, month);
      return res.status(http.StatusCodes.OK).json(revenue);
    } catch (error) {
      console.error(error);
      return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  },
  getRevenueMonthlyInYear: async (req, res) => {
    try {
      const year = req.params.year;
      const revenue = await dashboardService.getRevenueMonthlyInYear(year);
      return res.status(http.StatusCodes.OK).json(revenue);
    } catch (error) {
      console.error(error);
      return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  },
  getRevenueInMonth: async (req, res) => {
    try {
      const year = req.params.year;
      const month = req.params.month;
      const revenue = await dashboardService.getRevenueInMonth(year, month);
      return res.status(http.StatusCodes.OK).json(revenue);
    } catch (error) {
      console.error(error);
      return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  },
  getRevenueInYear: async (req, res) => {
    try {
      const year = req.params.year;
      const revenue = await dashboardService.getRevenueInYear(year);
      return res.status(http.StatusCodes.OK).json(revenue);
    } catch (error) {
      console.error(error);
      return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  },

  getProPlansInYear: async (req, res) => {
    try {
      const year = req.params.year;
      const proPlans = await dashboardService.getTotalProPlansPurchaseOfEachTypeInYear(year);
      return res.status(http.StatusCodes.OK).json(proPlans);
    } catch (error) {
      console.error(error);
      return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  },

  getTopProPlansInMonth: async (req, res) => {
    try {
      const year = req.params.year;
      const month = req.params.month;
      const proPlans = await dashboardService.getTopProPlansRevenueInMonth(year, month);
      return res.status(http.StatusCodes.OK).json(proPlans);
    } catch (error) {
      console.error(error);
      return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  },

  getTopProPlansInYear: async (req, res) => {
    try {
      const year = req.params.year;
      const proPlans = await dashboardService.getTopProPlansRevenueInYear(year);
      return res.status(http.StatusCodes.OK).json(proPlans);
    } catch (error) {
      console.error(error);
      return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  },

  getCreatedAccountsInMonth: async (req, res) => {
    try {
      const year = req.params.year;
      const month = req.params.month;
      const accounts = await dashboardService.getCreatedAccountsInMonth(year, month);
      return res.status(http.StatusCodes.OK).json(accounts);
    } catch (error) {
      console.error(error);
      return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  },

  getCreatedAccountsInYear: async (req, res) => {
    try {
      const year = req.params.year;
      const accounts = await dashboardService.getCreatedAccountsInYear(year);
      return res.status(http.StatusCodes.OK).json(accounts);
    } catch (error) {
      console.error(error);
      return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  },

  getCreatedAccountsDailyInMonth: async (req, res) => {
    try {
      const year = req.params.year;
      const month = req.params.month;
      const accounts = await dashboardService.getCreatedAccountsDailyInMonth(year, month);
      return res.status(http.StatusCodes.OK).json(accounts);
    } catch (error) {
      console.error(error);
      return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  },
  getTopCurrentLearnStreaks: async (req, res) => {
    try {
      const { top } = req.query;
      const streaks = await dashboardService.getTopCurrentLearnStreaks(top);
      return res.status(http.StatusCodes.OK).json(streaks);
    } catch (error) {
      console.error(error);
      return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  },
  getTopLongestLearnStreaks: async (req, res) => {
    try {
      const { top } = req.query;
      const streaks = await dashboardService.getTopLongestLearnStreaks(top);
      return res.status(http.StatusCodes.OK).json(streaks);
    } catch (error) {
      console.error(error);
      return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  },
  getTopLearnedCardsCount: async (req, res) => {
    try {
      const { top } = req.query;
      const cards = await dashboardService.getTopLearnedCardsCount(top);
      return res.status(http.StatusCodes.OK).json(cards);
    } catch (error) {
      console.error(error);
      return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  },
};

module.exports = dashboardController;

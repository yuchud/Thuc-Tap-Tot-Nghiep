const proPlansService = require('../services/pro-plan.service');
const http = require('http-status-codes');
const proPlanController = {
  getAllProPlans: async (req, res) => {
    try {
      const proPlans = await proPlansService.getAllProPlans();
      res.status(http.StatusCodes.OK).json(proPlans);
    } catch (error) {
      res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
  },

  getAllPublicProPlans: async (req, res) => {
    try {
      const proPlans = await proPlansService.getAllProPlans(true);
      res.status(http.StatusCodes.OK).json(proPlans);
    } catch (error) {
      res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
  },

  getProPlanById: async (req, res) => {
    try {
      const proPlanId = req.params.id;
      const proPlan = await proPlansService.getProPlanById(proPlanId);
      if (!proPlan) {
        res.status(http.StatusCodes.NOT_FOUND).send('Không tìm thấy Pro Plan');
        return;
      }
      res.status(http.StatusCodes.OK).json(proPlan);
    } catch (error) {
      res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
  },
  createProPlan: async (req, res) => {
    try {
      const proPlanData = req.body;
      const proPlan = await proPlansService.createProPlan(proPlanData);
      res.status(http.StatusCodes.CREATED).json(proPlan);
    } catch (error) {
      res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
  },
  updateProPlan: async (req, res) => {
    try {
      const proPlanId = req.params.id;
      const proPlanData = req.body;
      const proPlan = await proPlansService.updateProPlan(proPlanId, proPlanData);
      if (!proPlan) {
        res.status(http.StatusCodes.NOT_FOUND).send('Không tìm thấy Pro Plan');
        return;
      }
      res.status(http.StatusCodes.OK).json(proPlan);
    } catch (error) {
      res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
  },
  deleteProPlan: async (req, res) => {
    try {
      const proPlanId = req.params.id;
      const proPlan = await proPlansService.deleteProPlan(proPlanId);
      if (!proPlan) {
        res.status(http.StatusCodes.NOT_FOUND).send('Không tìm thấy Pro Plan');
        return;
      }
      res.status(http.StatusCodes.OK).json(proPlan);
    } catch (error) {
      res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
  },
  purchaseProPlan: async (req, res) => {
    try {
      const proPlanId = req.params.id;
      const accountId = req.body.account_id;
      const proPlan = await proPlansService.purchaseProPlan(proPlanId, accountId);
      res.status(http.StatusCodes.OK).json(proPlan);
    } catch (error) {
      res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
  },
};

module.exports = proPlanController;

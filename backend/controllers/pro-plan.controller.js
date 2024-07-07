const proPlanService = require("../services/pro-plan.service");
const baseController = require("./base.controller");

const proPlanController = {
  getAllProPlans: async function (req, res) {
    baseController.handleRequest(
      () => proPlanService.getAllProPlans(),
      req,
      res
    );
  },
  getProPlanById: async function (req, res) {
    const id = req.params.id;
    baseController.handleRequest(
      () => proPlanService.getProPlanById(id),
      req,
      res
    );
  },
  createProPlan: async function (req, res) {
    const proPlan = req.body;
    console.log(proPlanData);
    baseController.handleRequest(
      () => proPlanService.createProPlan(proPlanData),
      req,
      res
    );
  },
  updateProPlan: async function (req, res) {
    const id = req.params.id;
    const proPlanData = req.body;
    baseController.handleRequest(
      () => proPlanService.updateProPlan(id, proPlanData),
      req,
      res
    );
  },
  deleteProPlan: async function (req, res) {
    const id = req.params.id;
    baseController.handleRequest(
      () => proPlanService.deleteProPlan(id),
      req,
      res
    );
  },
};

module.exports = proPlanController;

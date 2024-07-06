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
    console.log(proPlan);
    baseController.handleRequest(
      () => proPlanService.createProPlan(proPlan),
      req,
      res
    );
  },
};

module.exports = proPlanController;

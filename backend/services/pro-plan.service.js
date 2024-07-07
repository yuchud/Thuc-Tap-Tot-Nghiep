proPlanRepository = require('../repositories/pro-plan.repository');

const proPlansService = {
  getAllProPlans: async function () {
    return await proPlanRepository.getAllProPlans();
  },
  getProPlanById: async function (id) {
    return await proPlanRepository.getProPlanById(id);
  },
  createProPlan: async function (proPlanData) {
    return await proPlanRepository.createProPlan(proPlanData);
  },
  updateProPlan: async function (id, proPlanData) {
    return await proPlanRepository.updateProPlan(id, proPlanData);
  },
  deleteProPlan: async function (id) {
    return await proPlanRepository.deleteProPlan(id);
  },
};

module.exports = proPlansService;
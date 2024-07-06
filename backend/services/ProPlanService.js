proPlanRepository = require('../repositories/ProPlanRepository');
const proPlansService = {
  getAllProPlans: async function () {
    return await proPlanRepository.getAllProPlans();
  },
  getProPlanById: async function (id) {
    return await proPlanRepository.getProPlanById(id);
  },
  createProPlan: async function (proPlan) {
    return await proPlanRepository.createProPlan(proPlan);
  },
};

module.exports = proPlansService;
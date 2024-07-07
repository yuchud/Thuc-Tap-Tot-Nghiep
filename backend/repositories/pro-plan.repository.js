const proPlanModel = require("../models/pro-plan.model");
const handleSequelizeError = require("../utils/sequelize-error-handler.util");

const proPlanRepository = {
  getAllProPlans: async () => {
    try {
      const proPlans = await proPlanModel.findAll();
      return proPlans;
    } catch (e) {
      return handleSequelizeError(e);
    }
  },
  getProPlanById: async (id) => {
    try {
      const proPlan = await proPlanModel.findByPk(id);
      return proPlan.id ? proPlan : { error: "Pro Plan not found" };
    } catch (e) {
      return handleSequelizeError(e);
    }
  },
  createProPlan: async (proPlanData) => {
    try {
      const newProPlan = await proPlanModel.create(proPlanData);
      return newProPlan.id;
    } catch (e) {
      return handleSequelizeError(e);
    }
  },
  deleteProPlan: async (id) => {
    try {
      const deletedCount = await proPlanModel.destroy({ where: { id: id } });
      return deletedCount > 0;
    } catch (e) {
      return handleSequelizeError(e);
    }
  },
  updateProPlan: async (id, proPlanData) => {
    try {
      const [updatedCount] = await proPlanModel.update(proPlanData, {
        where: { id: id },
      });
      return updatedCount > 0;
    } catch (e) {
      return handleSequelizeError(e);
    }
  },
};

module.exports = proPlanRepository;

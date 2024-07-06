const db = require("../db");

const proPlansModel = {
  getAllProPlans: async function () {
    try {
      const [rows] = await db.query("SELECT * FROM pro_plans");
      return rows;
    } catch (e) {
      console.error("proPlansModel.getAllProPlans", e.message);
      return { error: e.message };
    }
  },
  getProPlanById: async function (id) {
    try {
      const [rows] = await db.query("SELECT * FROM pro_plans WHERE id = ?", [
        id,
      ]);
      return rows[0];
    } catch (e) {
      console.error("proPlansModel.getProPlanById", e.message);
      return { error: e.message };
    }
  },
    createProPlan: async function (proPlan) {
        console.log(proPlan)
        try {
        const [result] = await db.query(
            "INSERT INTO pro_plans (name, price, description) VALUES (?, ?, ?)",
            [proPlan.name, proPlan.price, proPlan.description]
        );
        return result.insertId;
        } catch (e) {
        console.error("proPlansModel.createProPlan", e.message);
        return { error: e.message };
        }
    },
};

module.exports = proPlansModel;
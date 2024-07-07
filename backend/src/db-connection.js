require("dotenv").config();
const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

const models = {
  AccountRoleModel: require("../models/account-role.model").init(sequelize),
  AccountModel: require("../models/account.model").init(sequelize),
  DeckModel: require("../models/deck.model").init(sequelize),
  CustomerModel: require("../models/customer.model").init(sequelize),
  ProPlanModel: require("../models/pro-plan.model").init(sequelize),
};

Object.values(models)
  .filter((model) => typeof model.associate === "function")
  .forEach((model) => model.associate(models));

async function init() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync();
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

init();

module.exports = sequelize;

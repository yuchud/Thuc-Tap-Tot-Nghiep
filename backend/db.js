const mysql = require("mysql2");
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const Sequelize = require("sequelize");
// Create a connection pool using your database configuration
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
  AccountRoleModel: require("./models/AccountRoleModel").init(sequelize),
  AccountModel: require("./models/AccountModel").init(sequelize),
  DeckModel: require("./models/DeckModel").init(sequelize),
  CustomerModel: require("./models/CustomerModel").init(sequelize),
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

//const pool = mysql.createPool(dbConfig).promise(); // Using promise() allows you to use async/await for queries

// Export the pool for use in other parts of your application
// module.exports = pool;
module.exports = sequelize;

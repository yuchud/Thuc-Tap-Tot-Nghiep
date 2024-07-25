require('dotenv').config();
const dbConfig = require('./config/db.config');
const Sequelize = require('sequelize');

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
  AccountRoleModel: require('./models/account-role.model').init(sequelize),
  AccountModel: require('./models/account.model').init(sequelize),
  DeckModel: require('./models/deck.model').init(sequelize),
  ProPlanModel: require('./models/pro-plan.model').init(sequelize),
  CourseModel: require('./models/course.model').init(sequelize),
  CardModel: require('./models/card.model').init(sequelize),
  WordClassModel: require('./models/word-class.model').init(sequelize),

  AccountCourseDetailModel:
    require('./models/account-course-detail.model').init(sequelize),
  AccountDeckDetailModel: require('./models/account-deck-detail.model').init(
    sequelize
  ),
  AccountCardDetailModel: require('./models/account-card-detail.model').init(
    sequelize
  ),
};

Object.values(models)
  .filter((model) => typeof model.associate === 'function')
  .forEach((model) => model.associate(models));

async function init() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync();
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

if (process.env.NODE_ENV === 'development') {
  init();
}

module.exports = sequelize;

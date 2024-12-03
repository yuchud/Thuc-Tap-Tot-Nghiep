const { Sequelize, DataTypes } = require('sequelize');

class WeeklyLearnTrackerModel extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        account_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Accounts',
            key: 'id',
          },
        },
        day_of_week: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'WeeklyLearnTracker',
        tableName: 'weekly_learn_trackers',
        timestamps: false,
      }
    );
  }
}

module.exports = WeeklyLearnTrackerModel;

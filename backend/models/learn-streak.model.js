const { Sequelize, DataTypes } = require('sequelize');

class LearnStreakModel extends Sequelize.Model {
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
            model: 'Account',
            key: 'id',
          },
        },
        longest_learned_day_streak: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1,
        },
        current_learned_day_streak: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1,
        },
      },
      {
        sequelize,
        modelName: 'LearnStreak',
        tableName: 'learn_streaks',
        timestamps: false,
      }
    );
  }
}
module.exports = LearnStreakModel;

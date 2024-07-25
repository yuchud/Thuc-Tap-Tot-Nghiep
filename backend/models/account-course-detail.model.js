const { Sequelize, DataTypes } = require('sequelize');

class AccountCourseDetailModel extends Sequelize.Model {
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
        course_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Course',
            key: 'id',
          },
        },
        learned_deck_count: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        learned_card_count: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        last_reviewed_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },

      {
        sequelize,
        modelName: 'AccountCourseDetail',
        tableName: 'account_course_details',
        timestamps: false,
        indexes: [
          {
            unique: true,
            fields: ['account_id', 'course_id'],
          },
        ],
      }
    );
  }
}

module.exports = AccountCourseDetailModel;

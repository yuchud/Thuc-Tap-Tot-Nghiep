const { Sequelize, DataTypes } = require('sequelize');

class ProPlanModel extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        price_per_month: {
          type: DataTypes.DECIMAL(12, 2),
          allowNull: false,
          default: 0,
        },
        month_count: {
          type: DataTypes.INTEGER,
          allowNull: false,
          default: 1,
        },
        is_public: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        is_recommend: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        sequelize,
        modelName: 'ProPlan',
        tableName: 'pro_plans',
        timestamps: false,
      }
    );
  }
}

module.exports = ProPlanModel;

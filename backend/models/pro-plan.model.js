const { Sequelize, DataTypes } = require("sequelize");

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
        price: {
          type: DataTypes.DECIMAL(12, 2),
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        }
      },
      {
        sequelize,
        modelName: "ProPlan",
        tableName: "pro_plans",
        timestamps: false,
      }
    );
  }
}

module.exports = ProPlanModel;
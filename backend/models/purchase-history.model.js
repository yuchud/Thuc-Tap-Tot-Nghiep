const { Sequelize, DataTypes } = require('sequelize');

class PurchaseHistoryModel extends Sequelize.Model {
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
        pro_plan_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'ProPlan',
            key: 'id',
          },
        },
        purchased_amount: {
          type: DataTypes.DECIMAL(12, 2),
          allowNull: false,
          default: 0,
        },
        purchased_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        sequelize,
        modelName: 'PurchaseHistory',
        tableName: 'purchase_histories',
        timestamps: false,
      }
    );
  }
}

module.exports = PurchaseHistoryModel;

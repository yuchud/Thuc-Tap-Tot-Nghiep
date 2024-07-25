const { Sequelize, DataTypes } = require('sequelize');

class AccountCardDetailModel extends Sequelize.Model {
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
        card_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Card',
            key: 'id',
          },
        },
        last_reviewed_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: 'AccountCardDetail',
        tableName: 'account_card_details',
        timestamps: false,
        indexes: [
          {
            unique: true,
            fields: ['account_id', 'card_id'],
          },
        ],
      }
    );
  }
}

module.exports = AccountCardDetailModel;

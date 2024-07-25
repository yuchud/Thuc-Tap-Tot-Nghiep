const { Sequelize, DataTypes } = require('sequelize');

class AccountDeckDetailModel extends Sequelize.Model {
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
        deck_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Deck',
            key: 'id',
          },
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
        modelName: 'AccountDeckDetail',
        tableName: 'account_deck_details',
        timestamps: false,
        indexes: [
          {
            unique: true,
            fields: ['account_id', 'deck_id'],
          },
        ],
      }
    );
  }
}

module.exports = AccountDeckDetailModel;

const { Sequelize, DataTypes } = require('sequelize');

class AccountsModel extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        last_name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        first_name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        birthday: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        account_role_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'AccountRole',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        modelName: 'Account',
        tableName: 'accounts',
        timestamps: false,
      }
    );
  }
}

module.exports = AccountsModel;

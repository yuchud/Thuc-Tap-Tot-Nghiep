const {Sequelize, DataTypes} = require('sequelize');

class AccountsModel extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
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
                    model: 'account_roles',
                    key: 'id',
                },
            },
        }, {
            sequelize,
            modelName: 'Accounts',
            tableName: 'accounts',
            createdAt: 'created_at',
            updatedAt: false,
        });
    }
}

module.exports = AccountsModel;
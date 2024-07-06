const {Sequelize, DataTypes} = require('sequelize');

class AccountRoleModel extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: 'AccountRole',
            tableName: 'account_roles',
            timestamps: false,
        });
    }
}

module.exports = AccountRoleModel;
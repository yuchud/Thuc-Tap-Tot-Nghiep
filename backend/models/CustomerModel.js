const {Sequelize, DataTypes} = require('sequelize');

class CustomerModel extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: true
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: true
            },
            birthday: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            account_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'accounts',
                    key: 'id'
                }
            },
            
        }, {
            sequelize,
            modelName: 'Customer',
            tableName: 'customers',
            createdAt: false,
            updatedAt: false,
        });
    }
}

module.exports = CustomerModel;
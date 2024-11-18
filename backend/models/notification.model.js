const { Sequelize, DataTypes } = require('sequelize');

class NotificationModel extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        sender_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'accounts',
            key: 'id',
          },
        },
        recipient_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'accounts',
            key: 'id',
          },
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        message: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        is_read: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        is_deleted: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        url: {
          type: DataTypes.STRING,
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
        modelName: 'Notification',
        tableName: 'notifications',
        timestamps: false,
        underscored: true,
      }
    );
  }
}

module.exports = NotificationModel;

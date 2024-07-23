const { Sequelize, DataTypes } = require('sequelize');

class CardModel extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        front_text: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        front_image: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        back_text: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        is_public: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        deck_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Deck',
            key: 'id',
          },
        },
        word_class_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'WordClass',
            key: 'id',
          },
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        sequelize,
        modelName: 'Card',
        tableName: 'cards',
        timestamps: false,
      }
    );
  }
}

module.exports = CardModel;

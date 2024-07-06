const { Sequelize, DataTypes } = require("sequelize");

class DeckModel extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      card_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      }
    }, {
        sequelize,
        modelName: "Deck",
        tableName: "decks",
        createdAt: "created_at",
        updatedAt: false,
      }
    );
  }
}

module.exports = DeckModel;

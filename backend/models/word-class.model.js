const { Sequelize, DataTypes } = require('sequelize');

class WordClass extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        modelName: 'WordClass',
        tableName: 'word_classes',
        timestamps: false,
      }
    );
  }
}

module.exports = WordClass;

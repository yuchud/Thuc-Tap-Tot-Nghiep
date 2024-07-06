const db = require("../db");
const DeckModel = require("../models/DeckModel");
const handleSequelizeError = require("../utils/SequelizeErrorHandler");

const deckRepository = {
  getAllDecks: async function () {
    try {
      return await DeckModel.findAll();
    } catch (e) {
      console.error("decksModel.getAllDecks", e.message);
      return { error: e.message };
    }
  },
  getDeckById: async function (id) {
    try {
      return await DeckModel.findByPk(id);
    } catch (e) {
      console.error("decksModel.getDeckById", e.message);
      return { error: e.message };
    }
  },
  createDeck: async function (deckData) {
    try {
      const deck = await DeckModel.create(deckData);
      return await deck.dataValues.id;
    } catch (e) {;
      return handleSequelizeError(e);
    }
  },
  deleteDeck: async function (id) {
    try {
      return await DeckModel.destroy({ where: { id: id } });
    } catch (e) {
      return handleSequelizeError(e);
    }
  },
};


module.exports = deckRepository;
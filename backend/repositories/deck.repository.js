const DeckModel = require("../models/deck.model");
const handleSequelizeError = require("../utils/sequelize-error-handler.util");

const deckRepository = {
  getAllDecks: async function () {
    try {
      const decks = await DeckModel.findAll();
      return decks;
    } catch (e) {
      return handleSequelizeError(e);
    }
  },
  getDeckById: async function (id) {
    try {
      const deck = await DeckModel.findByPk(id);
      if (!deck) {
        throw new Error("Deck not found");
      }
      return deck;
    } catch (e) {
      return handleSequelizeError(e);
    }
  },
  createDeck: async function (deckData) {
    try {
      const deck = await DeckModel.create(deckData);
      return deck.id;
    } catch (e) {
      return handleSequelizeError(e);
    }
  },
  deleteDeck: async function (id) {
    try {
      const deletedCount = await DeckModel.destroy({ where: { id: id } });
      return deletedCount > 0;
    } catch (e) {
      return handleSequelizeError(e);
    }
  },
};

module.exports = deckRepository;

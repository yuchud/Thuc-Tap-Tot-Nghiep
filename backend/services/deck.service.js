const deckRepository = require("../repositories/deck.repository");

const deckService = {
  getAllDecks: async function () {
    return deckRepository.getAllDecks();
  },
  getDeckById: async function (id) {
    return deckRepository.getDeckById(id);
  },
  createDeck: async function (deckData) {
    return deckRepository.createDeck(deckData);
  },
  deleteDeck: async function (id) {
    return deckRepository.deleteDeck(id);
  },
};

module.exports = deckService;

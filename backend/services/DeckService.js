const deckRepository = require('../repositories/deckRepository');

const deckService = {
    getAllDecks: async function() {
        return await deckRepository.getAllDecks();
    },
    getDeckById: async function(id) {
        return await deckRepository.getDeckById(id);
    },
    createDeck: async function(deckData) {
        return await deckRepository.createDeck(deckData);
    },
    deleteDeck: async function(id) {
        return await deckRepository.deleteDeck(id);
    }
}

module.exports = deckService;

deckRepository = require("../repositories/DeskRepository");
const baseController = require("./BaseController");

const deckController = {
  getAllDecks: async function (req, res) {
    baseController.handleRequest(() => deckRepository.getAllDecks(), req, res);
  },
  getDeckById: async function (req, res) {
    baseController.handleRequest(
      () => deckRepository.getDeckById(req.params.id),
      req,
      res
    );
  },
  createDeck: async function (req, res) {
    baseController.handleRequest(
      () => deckRepository.createDeck(req.body),
      req,
      res
    );
  },
  deleteDeck: async function (req, res) {
    baseController.handleRequest(
      () => deckRepository.deleteDeck(req.params.id),
      req,
      res
    );
  },
};

module.exports = deckController;

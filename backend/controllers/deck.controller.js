const deckService = require('../services/deck.service');
const cardService = require('../services/card.service');
const http = require('http-status-codes');
const objectName = require('../utils/props-and-objects.util').OBJECTS.DECK;
const actionCreate = require('../utils/props-and-objects.util').ACTIONS.CREATE;
const actionUpdate = require('../utils/props-and-objects.util').ACTIONS.UPDATE;
const actionDelete = require('../utils/props-and-objects.util').ACTIONS.DELETE;
const nameProp = require('../utils/props-and-objects.util').PROPS.NAME;
const requestMessageUtil = require('../utils/requestMessage.util');
const { getAllCards } = require('../services/card.service');
const CARD = require('../utils/props-and-objects.util').OBJECTS.CARD;

const deckController = {
  getAllDecks: async (req, res) => {
    try {
      const { page, limit } = req.query;
      const decks = await deckService.getAllDecks(+page, +limit);
      res.status(http.StatusCodes.OK).json(decks);
    } catch (error) {
      console.log(error);
      res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  },

  getDeckById: async (req, res) => {
    const { id } = req.params;
    const { account_id } = req.query;
    try {
      const deck = await deckService.getDeckById(id, account_id);
      if (!deck) {
        return res.status(http.StatusCodes.NOT_FOUND).json({
          message: requestMessageUtil.notFoundObject(objectName),
        });
      }
      res.status(http.StatusCodes.OK).json(deck);
    } catch (error) {
      console.log(error);
      res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  },

  getDecksByCourseId: async (req, res) => {
    const { id } = req.params;
    try {
      const { page, limit } = req.query;
      const decks = await deckService.getDecksByCourseId(id, +page, +limit);
      res.status(http.StatusCodes.OK).json(decks);
    } catch (error) {
      console.log(error);
      res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  },

  getPublicDecksByCourseId: async (req, res) => {
    try {
      const { id } = req.params;
      const { page, limit, account_id } = req.query;
      const decks = await deckService.getDecksByCourseId(id, +page, +limit, true, account_id);
      res.status(http.StatusCodes.OK).json(decks);
    } catch (error) {
      console.log(error);
      res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  },

  createDeck: async (req, res) => {
    const { name, description, course_id } = req.body;
    const image = req.file;
    try {
      if (!name.trim()) {
        return res.status(http.StatusCodes.BAD_REQUEST).json({
          message: requestMessageUtil.requiredObject(nameProp, objectName),
        });
      }

      const isDuplicatedName = await deckService.isDuplicatedName(name);
      if (isDuplicatedName) {
        return res.status(http.StatusCodes.BAD_REQUEST).json({
          message: requestMessageUtil.duplicatedObject(nameProp, objectName),
        });
      }

      await deckService.createDeck({
        name,
        description,
        image,
        course_id,
      });
      res.status(http.StatusCodes.CREATED).json({
        message: requestMessageUtil.successActionObject(actionCreate, objectName),
      });
    } catch (error) {
      console.log(error);
      res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  },

  updateDeck: async (req, res) => {
    const { id } = req.params;
    const { name, description, is_public } = req.body;
    const image = req.file;
    try {
      if (!name.trim()) {
        return res.status(http.StatusCodes.BAD_REQUEST).json({
          message: requestMessageUtil.requiredObject(nameProp, objectName),
        });
      }

      const deck = await deckService.getDeckByName(name);
      if (deck && deck.id != id) {
        return res.status(http.StatusCodes.BAD_REQUEST).json({
          message: requestMessageUtil.duplicatedObject(nameProp, objectName),
        });
      }

      await deckService.updateDeck({
        id,
        name,
        description,
        image,
        is_public,
      });
      res.status(http.StatusCodes.OK).json({
        message: requestMessageUtil.successActionObject(actionUpdate, objectName),
      });
    } catch (error) {
      console.log(error);
      res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  },

  deleteDeck: async (req, res) => {
    const { id } = req.params;
    try {
      const deck = await deckService.getDeckById(id);
      if (!deck) {
        return res.status(http.StatusCodes.NOT_FOUND).json({
          message: requestMessageUtil.notFoundObject(objectName),
        });
      }
      if (deck.card_count > 0) {
        return res.status(http.StatusCodes.BAD_REQUEST).json({
          message: requestMessageUtil.cannotDeleteObjectWithChild(objectName, CARD),
        });
      }

      const deleteDeck = await deckService.deleteDeck(id);
      if (!deleteDeck) {
        return res.status(http.StatusCodes.NOT_FOUND).json({
          message: requestMessageUtil.notFoundObject(objectName),
        });
      }
      res.status(http.StatusCodes.OK).json({
        message: requestMessageUtil.successActionObject(actionDelete, objectName),
      });
    } catch (error) {
      console.log(error);
      res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  },
  getCardsByDeckId: async (req, res) => {
    const { id } = req.params;
    try {
      const deck = await deckService.getDeckById(id);
      if (!deck) {
        return res.status(http.StatusCodes.NOT_FOUND).json({
          message: requestMessageUtil.notFoundObject(objectName),
        });
      }
      const cards = await cardService.getCardsByDeckId(id);
      if (!cards) {
        return res.status(http.StatusCodes.NOT_FOUND).json({
          message: requestMessageUtil.notFoundObject(CARD),
        });
      }
      res.status(http.StatusCodes.OK).json(cards);
    } catch (error) {
      console.log(error);
      res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  },
};

module.exports = deckController;

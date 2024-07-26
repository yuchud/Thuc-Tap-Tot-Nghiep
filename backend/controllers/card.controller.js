const CardService = require('../services/card.service');
const http = require('http-status-codes');
const objectName = require('../utils/props-and-objects.util').OBJECTS.CARD;
const actionCreate = require('../utils/props-and-objects.util').ACTIONS.CREATE;
const actionUpdate = require('../utils/props-and-objects.util').ACTIONS.UPDATE;
const actionDelete = require('../utils/props-and-objects.util').ACTIONS.DELETE;
const frontTextProp = require('../utils/props-and-objects.util').PROPS.FRONT_TEXT;
const backTextProp = require('../utils/props-and-objects.util').PROPS.BACK_TEXT;
const DECK = require('../utils/props-and-objects.util').OBJECTS.DECK;
const requestMessageUtil = require('../utils/requestMessage.util');
const cardService = require('../services/card.service');

const CardController = {
  getAllCards: async (req, res) => {
    try {
      const cards = await cardService.getAllCards();
      res.status(http.StatusCodes.OK).json(cards);
    } catch (error) {
      console.log(error);
      res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  },
  createCard: async (req, res) => {
    try {
      const cardData = req.body;
      console.log(cardData);
      const front_image = req.file;
      const card = await cardService.createCard(cardData, front_image);

      res.status(http.StatusCodes.CREATED).json({
        message: requestMessageUtil.successActionObject(actionCreate, objectName),
      });
    } catch (error) {
      console.log(error);
      res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  },
  updateCard: async (req, res) => {
    try {
      const { id } = req.params;
      const { front_text, back_text, deck_id, is_public, word_class_id } = req.body;
      const front_image = req.file;
      const updatedCard = await cardService.updateCard(
        id,
        front_text,
        front_image,
        back_text,
        deck_id,
        is_public,
        word_class_id
      );
      if (!updatedCard) {
        return res.status(http.StatusCodes.NOT_FOUND).json({
          error: requestMessageUtil.notFoundObject(objectName),
        });
      }
      return res.status(http.StatusCodes.OK).json({
        message: requestMessageUtil.successActionObject(actionUpdate, objectName),
      });
    } catch (error) {
      console.log(error);
      res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  },

  deleteCard: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedCard = await cardService.deleteCard(id);
      if (!deletedCard) {
        return res.status(http.StatusCodes.NOT_FOUND).json({
          error: requestMessageUtil.notFoundObject(objectName),
        });
      }
      return res.status(http.StatusCodes.OK).json({
        message: requestMessageUtil.successActionObject(actionDelete, objectName),
      });
    } catch (error) {
      console.log(error);
      res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  },
  getPublicCardsByDeckId: async (req, res) => {
    const { id } = req.params;
    const { account_id } = req.query;
    try {
      const cards = await cardService.getCardsByDeckId(id, true, account_id);
      if (!cards) {
        return res.status(http.StatusCodes.NOT_FOUND).json({
          message: requestMessageUtil.notFoundObject(objectName),
        });
      }
      res.status(http.StatusCodes.OK).json(cards);
    } catch (error) {
      console.log(error);
      res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  },
};

module.exports = CardController;

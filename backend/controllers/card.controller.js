const http = require('http-status-codes');
const objectName = require('../utils/props-and-objects.util').OBJECTS.CARD;
const actionCreate = require('../utils/props-and-objects.util').ACTIONS.CREATE;
const actionUpdate = require('../utils/props-and-objects.util').ACTIONS.UPDATE;
const actionDelete = require('../utils/props-and-objects.util').ACTIONS.DELETE;
const requestMessageUtil = require('../utils/requestMessage.util');
const cardService = require('../services/card.service');
const accountCardDetailService = require('../services/account-card-detail.service');

const CardController = {
  getAllCards: async (_, res) => {
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
      // console.log(cardData);
      let { front_image_file, front_audio_file } = req.files;
      front_image_file = front_image_file ? front_image_file[0] : null;
      front_audio_file = front_audio_file ? front_audio_file[0] : null;
      // console.log(front_image_file, front_audio_file);
      await cardService.createCard(cardData, front_image_file, front_audio_file);
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
      const cardData = req.body;
      let { front_image_file, front_audio_file } = req.files;
      console.log(front_image_file, front_audio_file);
      front_image_file = front_image_file ? front_image_file[0] : null;
      front_audio_file = front_audio_file ? front_audio_file[0] : null;
      // console.log(front_image_file, front_audio_file);
      const updatedCard = await cardService.updateCard(id, cardData, front_image_file, front_audio_file);
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
      const accountCardDetail = accountCardDetailService.getAccountCardDetails();
      if (accountCardDetail) {
        return res.status(http.StatusCodes.FORBIDDEN).json({
          error: 'Không thẻ xóa thẻ đã có người học',
        });
      }
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

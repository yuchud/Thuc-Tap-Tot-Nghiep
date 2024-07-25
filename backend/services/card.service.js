const CardModel = require('../models/card.model');
const DeckModel = require('../models/deck.model');
const CourseModel = require('../models/course.model');
const sequelize = require('../db-connection');
const azureStorage = require('../utils/azure-storage.util');
const appConfig = require('../config/app.config');

const CardService = {
  getAllCards: async () => {
    try {
      return await CardModel.findAll();
    } catch (error) {
      throw error;
    }
  },
  getCardById: async (id) => {
    try {
      return await CardModel.findByPk(id);
    } catch (error) {
      throw error;
    }
  },
  createCard: async (cardData, front_image) => {
    try {
      let card = null;
      await sequelize.transaction(async (t) => {
        let imageUrl = null;
        if (front_image) {
          imageUrl = await azureStorage.uploadImage(
            'cards/front', // Azure container name
            front_image // Construct a unique path for the image
          );
        }
        if (imageUrl === null) {
          imageUrl = appConfig.DEFAULT_CARD_FRONT_IMAGE;
        }
        cardData.front_image = imageUrl;
        console.log(cardData);
        card = await CardModel.create(cardData, { transaction: t });
        const deck = await DeckModel.findByPk(cardData.deck_id, { transaction: t });
        deck.increment('card_count', { by: 1 }, { transaction: t });
        CourseModel.increment('card_count', { by: 1, where: { id: deck.course_id } }, { transaction: t });
      });

      return card;
    } catch (error) {
      throw error;
    }
  },
  updateCard: async (id, front_text, front_image, back_text, deck_id, is_public, word_class_id) => {
    try {
      let updatedCard = null;
      const card = await CardModel.findByPk(id);
      if (!card) {
        return null;
      }

      await sequelize.transaction(async (t) => {
        let imageUrl = null;
        if (front_image) {
          imageUrl = await azureStorage.uploadImage(
            (containerName = 'cards/front'), // Azure container name
            front_image // Construct a unique path for the image
          );
        }
        if (imageUrl === null) {
          imageUrl = appConfig.DEFAULT_CARD_FRONT_IMAGE;
        }

        updatedCard = await card.update(
          {
            front_text,
            front_image: imageUrl,
            back_text,
            deck_id,
            is_public,
            word_class_id,
          },
          { transaction: t }
        );
      });

      return updatedCard;
    } catch (error) {
      throw error;
    }
  },
  deleteCard: async (id) => {
    try {
      let deletedCard = null;
      const card = await CardModel.findByPk(id);
      if (!card) {
        return null;
      }

      await sequelize.transaction(async (t) => {
        try {
        } catch (error) {
          console.log(error);
        }

        deletedCard = await card.destroy(
          {
            where: {
              id: id,
            },
          },
          { transaction: t }
        );
        const deck = await DeckModel.findByPk(card.deck_id, { transaction: t });
        deck.decrement('card_count', { by: 1 }, { transaction: t });
        CourseModel.decrement('card_count', { by: 1, where: { id: deck.course_id } }, { transaction: t });
      });
      console.log(deletedCard);
      return deletedCard;
    } catch (error) {
      throw error;
    }
  },
  getCardsByDeckId: async (deckId, is_public = null) => {
    try {
      const whereClause = is_public ? { deck_id: deckId, is_public } : { deck_id: deckId };
      return await CardModel.findAll({
        where: whereClause,
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

module.exports = CardService;

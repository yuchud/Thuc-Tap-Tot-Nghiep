const deckModel = require('../models/deck.model');
const courseModel = require('../models/course.model');
const sequelize = require('sequelize');
const azureStorage = require('../utils/azure-storage.util');
const { DEFAULT_DECK_IMAGE } = require('../config/app.config');
const accountDeckDetailModel = require('../models/account-deck-detail.model');

const deckService = {
  getAllDecks: async (page = 1, limit = 12, is_public = null) => {
    try {
      const offset = (page - 1) * limit;
      const whereClause = is_public === null ? {} : { is_public: is_public };
      const { count, rows } = await deckModel.findAndCountAll({
        where: whereClause,
        limit: limit,
        offset: offset,
      });
      return {
        total: count,
        decks: rows,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  getDeckById: async (deck_id, account_id) => {
    try {
      const deck = await deckModel.findByPk(deck_id);
      if (!deck) {
        return null;
      }
      if (account_id) {
        const accountDeckDetail = await accountDeckDetailModel.findOne({
          where: {
            deck_id: deck_id,
            account_id: account_id,
          },
        });
        deck.dataValues.learned_card_count = accountDeckDetail ? accountDeckDetail.learned_card_count : 0;
        deck.dataValues.progress = accountDeckDetail
          ? (accountDeckDetail.learned_card_count / deck.card_count) * 100
          : 0;
      }
      return deck;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  getDeckByName: async (name) => {
    try {
      const deck = await deckModel.findOne({
        where: {
          name: name,
        },
      });
      return deck;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  isDuplicatedName: async (name, id = -1) => {
    try {
      const deck = await deckService.getDeckByName(name);
      if (deck === null) {
        return false;
      }

      if (deck.id == id) {
        return false;
      }

      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  createDeck: async ({ name, description, image, course_id }) => {
    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await azureStorage.uploadImage(
          (containerName = 'decks'), // Azure container name
          image
        );
      }
      if (imageUrl === null) {
        imageUrl = DEFAULT_DECK_IMAGE;
      }

      await deckModel.create({
        name,
        description,
        image_url: imageUrl,
        course_id,
      });
      await courseModel.update(
        {
          deck_count: sequelize.literal('deck_count + 1'),
        },
        {
          where: {
            id: course_id,
          },
        }
      );
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  updateDeck: async ({ id, name, description, image, is_public }) => {
    try {
      const deck = await deckModel.findByPk(id);
      if (!deck) {
        return null;
      }
      console.log('updateDeck', id, name, description, image, is_public);
      let imageUrl = null;
      if (image) {
        imageUrl = await azureStorage.uploadImage(
          (containerName = 'decks'), // Azure container name
          image
        );
      }
      if (imageUrl === null) {
        imageUrl = imageUrl || deck.image_url;
      }
      await deckModel.update(
        {
          name,
          description,
          image_url: imageUrl,
          is_public,
          updated_at: new Date(),
        },
        {
          where: {
            id: id,
          },
        }
      );
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  deleteDeck: async (deck_id) => {
    try {
      const deck = await deckModel.findByPk(deck_id);
      if (!deck) {
        return null;
      }
      const course_id = deck.course_id;

      const deletedDeck = await deckModel.destroy({
        where: {
          id: deck_id,
        },
      });

      await courseModel.update(
        {
          deck_count: sequelize.literal('deck_count - 1'),
        },
        {
          where: {
            id: course_id,
          },
        }
      );
      return deletedDeck;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  getDecksByCourseId: async (courseId, page = 1, limit = 12, is_public = null, account_id = null) => {
    try {
      if (page < 1) {
        page = 1;
      }
      const offset = (page - 1) * limit;
      const whereClause = is_public === null ? { course_id: courseId } : { course_id: courseId, is_public: is_public };
      const { count, rows } = await deckModel.findAndCountAll({
        where: whereClause,
        limit: limit,
        offset: offset,
      });
      if (account_id) {
        const decksWithProgress = await Promise.all(
          rows.map(async (deck) => {
            const accountDeckDetail = await accountDeckDetailModel.findOne({
              where: {
                deck_id: deck.id,
                account_id: account_id,
              },
            });
            deck.dataValues.learned_card_count = accountDeckDetail ? accountDeckDetail.learned_card_count : 0;
            deck.dataValues.progress = accountDeckDetail
              ? (accountDeckDetail.learned_card_count / deck.card_count) * 100
              : 0;
            deck.dataValues.last_reviewed_at = accountDeckDetail ? accountDeckDetail.last_reviewed_at : null;
            return deck;
          })
        );
      }
      return {
        total: count,
        decks: rows,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

module.exports = deckService;

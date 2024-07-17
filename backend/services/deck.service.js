const deckModel = require('../models/deck.model');
const courseModel = require('../models/course.model');
const sequelize = require('sequelize');
const azureStorage = require('../utils/azure-storage.util');
const { DEFAULT_DECK_IMAGE } = require('../config/app.config');

const deckService = {
  getAllDecks: async (page = 1, limit = 12) => {
    try {
      const offset = (page - 1) * limit;
      const { count, rows } = await deckModel.findAndCountAll({
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
  getDeckById: async (deckId) => {
    try {
      const deck = await deckModel.findByPk(deckId);
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
  getDecksByCourseId: async (courseId, page = 1, limit = 12) => {
    try {
      const offset = (page - 1) * limit;
      const { count, rows } = await deckModel.findAndCountAll({
        where: {
          course_id: courseId,
        },
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
};

module.exports = deckService;

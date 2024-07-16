const { getDecksByCourseId } = require('../controllers/deck.controller');
const deckModel = require('../models/deck.model');

const deckService = {
  getAllDecks: async (page = 1, limit = 10) => {
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

      await deckModel.create({
        name,
        description,
        image_url: imageUrl,
        course_id,
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  updateDeck: async ({ id, name, description, image }) => {
    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await azureStorage.uploadImage(
          (containerName = 'decks'), // Azure container name
          image
        );
      }

      await deckModel.update(
        {
          name,
          description,
          image_url: imageUrl,
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
  deleteDeck: async (id) => {
    try {
      await deckModel.destroy({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  getDecksByCourseId: async (courseId) => {
    try {
      const decks = await deckModel.findAll({
        where: {
          course_id: courseId,
        },
      });
      return decks;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

module.exports = deckService;

const CardModel = require('../models/card.model');
const DeckModel = require('../models/deck.model');
const CourseModel = require('../models/course.model');
const sequelize = require('../db-connection');
const azureStorage = require('../utils/azure-storage.util');
const appConfig = require('../config/app.config');
const accountCardDetailModel = require('../models/account-card-detail.model');
const audioUtil = require('../utils/audio.util');
const accountDeckDetailModel = require('../models/account-deck-detail.model');
const AccountCourseDetailModel = require('../models/account-course-detail.model');
// const { Audio } = require('audio');

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
  createCard: async (cardData, front_image, front_audio) => {
    try {
      // console.log(front_image, front_audio);
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
        // console.log(cardData);

        let audioUrl = null;
        if (front_audio) {
          audioUrl = await azureStorage.uploadAudio(
            (containerName = 'cards/front'), // Azure container name
            front_audio // Construct a unique path for the audio
          );
        }
        cardData.front_audio_url = audioUrl;

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
  updateCard: async (id, cardData, front_image, front_audio) => {
    let updatedCard = null;
    try {
      // console.log(id, front_image, front_audio, cardData);
      const transaction = await sequelize.transaction();
      const card = await CardModel.findByPk(id);
      if (!card) {
        return null;
      }

      // await sequelize.transaction(async (t) => {
      let imageUrl = null;
      if (front_image) {
        imageUrl = await azureStorage.uploadImage(
          (containerName = 'cards/front'), // Azure container name
          front_image // Construct a unique path for the image
        );
      }

      if (imageUrl === null) {
        imageUrl = card.front_image;
      }
      cardData.front_image = imageUrl;

      let audioUrl = null;

      if (front_audio) {
        audioUrl = await azureStorage.uploadAudio(
          (containerName = 'cards/front'), // Azure container name
          front_audio // Construct a unique path for the audio
        );
      }

      if (audioUrl === null) {
        audioUrl = card.front_audio_url;
      }

      cardData.front_audio_url = audioUrl;
      cardData.updated_at = new Date();

      const previousPublicStatus = Boolean(card.is_public);
      updatedCard = await card.update(
        cardData,

        { transaction }
      );
      const currentPublicStatus = Boolean(card.is_public);
      console.log(previousPublicStatus, currentPublicStatus, previousPublicStatus !== currentPublicStatus);
      if (previousPublicStatus != currentPublicStatus) {
        console.log(previousPublicStatus, currentPublicStatus, previousPublicStatus !== currentPublicStatus);
        const deck = await DeckModel.findByPk(card.deck_id, { transaction });
        const course = await CourseModel.findByPk(deck.course_id, { transaction });
        const accountsLearnedCards = await accountCardDetailModel.findAll({
          where: { card_id: card.id },
          transaction,
        });

        const accountDeckDetail = await accountDeckDetailModel.findAll({
          where: { deck_id: card.deck_id, account_id: accountsLearnedCards.map((account) => account.account_id) },
          transaction,
        });

        const accountCourseDetail = await AccountCourseDetailModel.findAll({
          where: { course_id: deck.course_id, account_id: accountsLearnedCards.map((account) => account.account_id) },
          transaction,
        });

        if (currentPublicStatus) {
          deck.increment('public_card_count', { by: 1 }, { transaction });
          course.increment('public_card_count', { by: 1 }, { transaction });
          for (let i = 0; i < accountDeckDetail.length; i++) {
            accountDeckDetail[i].increment('learned_card_count', { by: 1 }, { transaction });
          }
          for (let i = 0; i < accountCourseDetail.length; i++) {
            accountCourseDetail[i].increment('learned_card_count', { by: 1 }, { transaction });
          }
        } else {
          deck.decrement('public_card_count', { by: 1 }, { transaction });
          course.decrement('public_card_count', { by: 1 }, { transaction });
          for (let i = 0; i < accountDeckDetail.length; i++) {
            accountDeckDetail[i].decrement('learned_card_count', { by: 1 }, { transaction });
          }
          for (let i = 0; i < accountCourseDetail.length; i++) {
            accountCourseDetail[i].decrement('learned_card_count', { by: 1 }, { transaction });
          }
        }
      }

      // });
      await transaction.commit();
      return updatedCard;
    } catch (error) {
      await transaction.rollback();
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
  getCardsByDeckId: async (deckId, is_public = null, account_id = null) => {
    try {
      const whereClause = is_public ? { deck_id: deckId, is_public } : { deck_id: deckId };
      const cards = await CardModel.findAll({
        where: whereClause,

        // order: [['updated_at', 'DESC']],
      });
      if (account_id) {
        const cardsWithProgress = await Promise.all(
          cards.map(async (card) => {
            const accountCardDetail = await accountCardDetailModel.findOne({
              where: {
                account_id,
                card_id: card.id,
              },
            });
            card.dataValues.is_learned = accountCardDetail ? true : false;
            card.dataValues.last_reviewed_at = accountCardDetail ? accountCardDetail.last_reviewed_at : null;
          })
        );
      }
      return cards;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

module.exports = CardService;

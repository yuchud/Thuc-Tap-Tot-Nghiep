const AccountCardDetailModel = require('../models/account-card-detail.model');
const AccountDeckDetailModel = require('../models/account-deck-detail.model');
const AccountCourseDetailModel = require('../models/account-course-detail.model');
require('dotenv').config();
const sequelize = require('../db-connection');

const DeckModel = require('../models/deck.model');
const DateService = require('./date.service');

const learningService = {
  finishLearning: async (accountID, studiedCards) => {
    if (studiedCards.length === 0) {
      return false;
    }
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    const currentDateTime = DateService.getCurrentDateTime();
    console.log('currentDateTime', currentDateTime);
    const transaction = await sequelize.transaction();
    try {
      let leanredDecksList = [];
      let learnedCoursesList = [];

      // insert learned cards to account_card_details table
      for (const studiedCard of studiedCards) {
        const accountCardDetail = await AccountCardDetailModel.findOne({
          where: {
            account_id: accountID,
            card_id: studiedCard.id,
          },
        });
        const isCardStudied = accountCardDetail !== null;
        //console.log('isCardStudied', isCardStudied);
        if (isCardStudied === false) {
          await AccountCardDetailModel.create(
            {
              account_id: accountID,
              card_id: studiedCard.id,
              last_reviewed_at: currentDateTime,
            },
            { transaction }
          );
        } else {
          await AccountCardDetailModel.update(
            {
              last_reviewed_at: currentDateTime,
            },
            {
              where: {
                account_id: accountID,
                card_id: studiedCard.id,
              },
              transaction,
            }
          );
        }
        let currentStudiedDeckIDsIndex = leanredDecksList.findIndex((deck) => deck.id === studiedCard.deck_id);
        if (currentStudiedDeckIDsIndex === -1) {
          leanredDecksList.push({
            id: studiedCard.deck_id,
            learnedCardCount: 0,
          });
          currentStudiedDeckIDsIndex = leanredDecksList.length - 1;
        }
        if (isCardStudied === false) {
          // leanredDecksList[currentStudiedDeckIDsIndex].learnedCardCount += 1;
          leanredDecksList[currentStudiedDeckIDsIndex].learnedCardCount += 1;
        }
      }

      // console.log('leanredDecksList', leanredDecksList);
      // ** create or update learn_deck_count in account_deck_details table
      for (const leanredDeck of leanredDecksList) {
        // console.log('leanredDeck', leanredDeck);
        const deckId = leanredDeck.id;
        const learnedCardCount = leanredDeck.learnedCardCount;
        const accountDeckDetail = await AccountDeckDetailModel.findOne({
          where: {
            account_id: accountID,
            deck_id: deckId,
          },
        });
        const isDeckStudied = accountDeckDetail !== null;
        if (isDeckStudied === false) {
          await AccountDeckDetailModel.create(
            {
              account_id: accountID,
              deck_id: deckId,
              learned_card_count: learnedCardCount,
              last_reviewed_at: currentDateTime,
            },
            { transaction }
          );
        } else {
          await AccountDeckDetailModel.update(
            {
              last_reviewed_at: currentDateTime,
              learned_card_count: accountDeckDetail.learned_card_count + learnedCardCount,
            },
            {
              where: {
                account_id: accountID,
                deck_id: deckId,
              },
              transaction,
            }
          );
        }

        // count the number of courses can not studied
        const deck = await DeckModel.findByPk(deckId);
        let learnedCoursesListIndex = learnedCoursesList.findIndex((course) => deck.course_id === course.id);
        if (learnedCoursesListIndex === -1) {
          learnedCoursesList.push({
            id: deck.course_id,
            learnedDecksCount: 0,
            learnedCardsCount: 0,
          });
          learnedCoursesListIndex = learnedCoursesList.length - 1;
        }
        if (isDeckStudied === false) {
          learnedCoursesList[learnedCoursesListIndex].learnedDecksCount += 1;
          learnedCoursesList[learnedCoursesListIndex].learnedCardsCount += learnedCardCount;
        }
      }
      // console.log('learnedCoursesList', learnedCoursesList);
      // create or update learn_course_count in account_course_details table
      for (const learnedCourse of learnedCoursesList) {
        const courseID = learnedCourse.id;
        const learnedDecksCount = learnedCourse.learnedDecksCount;
        const learnedCardsCount = learnedCourse.learnedCardsCount;
        const accountCourseDetail = await AccountCourseDetailModel.findOne({
          where: {
            account_id: accountID,
            course_id: courseID,
          },
        });
        const isCourseStudied = accountCourseDetail !== null;
        if (isCourseStudied === false) {
          await AccountCourseDetailModel.create(
            {
              account_id: accountID,
              course_id: courseID,
              learned_deck_count: learnedDecksCount,
              learned_card_count: learnedCardsCount,
              last_reviewed_at: currentDateTime,
            },
            { transaction }
          );
        } else {
          await AccountCourseDetailModel.update(
            {
              last_reviewed_at: currentDateTime,
              learned_deck_count: accountCourseDetail.learned_deck_count + learnedDecksCount,
              learned_card_count: accountCourseDetail.learned_card_count + learnedCardsCount,
            },
            {
              where: {
                account_id: accountID,
                course_id: courseID,
              },
              transaction,
            }
          );
        }
      }
      await transaction.commit();
      return true;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};

module.exports = learningService;

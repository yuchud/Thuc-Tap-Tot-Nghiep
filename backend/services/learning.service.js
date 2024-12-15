const AccountCardDetailModel = require('../models/account-card-detail.model');
const AccountDeckDetailModel = require('../models/account-deck-detail.model');
const AccountCourseDetailModel = require('../models/account-course-detail.model');
const AccountModel = require('../models/account.model');
const LearnStreakModel = require('../models/learn-streak.model');
const WeeklyLearnTrackerModel = require('../models/weekly-learn-tracker.model');

require('dotenv').config();
const sequelize = require('../db-connection');

const DeckModel = require('../models/deck.model');
const DateService = require('../utils/date.util');
const CardModel = require('../models/card.model');
const CoursesModel = require('../models/course.model');
const WordClassModel = require('../models/word-class.model');
const wordnikService = require('./wordnik.service');

const learningService = {
  getCardsToStudyInDeck: async (accountID, deckID, limit = 8) => {
    // 1.get all cards in a deck
    const cards = await CardModel.findAll({
      where: { deck_id: deckID, is_public: true },
    });

    // console.log('cards', cards);
    //2. get learned cards in a deck
    const accountCardDetail = await AccountCardDetailModel.findAll({
      where: {
        account_id: accountID,
        card_id: cards.map((card) => card.id),
      },
    });
    // console.log('accountCardDetail', accountCardDetail);
    // 3. join 1 and 2 to get cards to study in a deck
    let cardsToStudy = cards.map((card) => {
      const cardsWithPerformance = accountCardDetail.find((detail) => detail.card_id === card.id);
      return {
        ...card.toJSON(),
        performance: cardsWithPerformance ? cardsWithPerformance.performance : 0,
      };
    });
    // console.log('cardsToStudy', cardsToStudy);
    // 4. sort cards to study by performance
    cardsToStudy.sort((a, b) => a.performance - b.performance);

    // console.log('cardsToStudy', cardsToStudy.slice(0, limit));
    // 5. get the first limit cards
    cardsToStudy = cardsToStudy.slice(0, limit);
    //console.log('cardsToStudy', cardsToStudy);
    // 6. get all word classes
    const wordClasses = await WordClassModel.findAll();

    // 7. join 5 and 6 to get cards to study with word classes name
    return cardsToStudy.map((card) => {
      const wordClass = wordClasses.find((wordClass) => wordClass.id === card.word_class_id);

      return {
        ...card,
        word_class_name: wordClass ? wordClass.name : '',
        performance: 0,
        learned_count: 0,
      };
    });
  },
  getCardsToStudyInCourse: async (accountID, courseID, limit = 12) => {
    // 1.get all cards in a course
    const decks = await DeckModel.findAll({
      where: { course_id: courseID },
    });
    const deckIDs = decks.map((deck) => deck.id);
    const cards = await CardModel.findAll({
      where: { deck_id: deckIDs },
    });

    //2. get learned cards in a course
    const accountCardDetail = await AccountCardDetailModel.findAll({
      where: {
        account_id: accountID,
        card_id: cards.map((card) => card.id),
      },
    });
    // 3. join 1 and 2 to get cards to study in a course
    const cardsToStudy = cards.map((card) => {
      const cardsWithPerformance = accountCardDetail.find((detail) => detail.card_id === card.id);
      return {
        ...card.toJSON(),
        performance: cardsWithPerformance ? cardsWithPerformance.performance : 0,
      };
    });
    // 4. sort cards to study by performance
    cardsToStudy.sort((a, b) => a.performance - b.performance);

    // 5. get the first limit cards
    cardsToStudy.slice(0, limit);

    // 6. get all word classes
    const wordClasses = await WordClassModel.findAll();
    // console.log('wordClasses', wordClasses);
    // 7. join 5 and 6 to get cards to study with word classes name
    return cardsToStudy.map((card) => {
      const wordClass = wordClasses.find((wordClass) => wordClass.id === card.word_class_id);
      //console.log('wordClass', wordClass);
      return {
        ...card,
        word_class_name: wordClass ? wordClass.name : '',
        performance: 0,
        learned_count: 0,
      };
    });
  },
  getCardsToTest: async (accountID, limit = 10) => {
    const account = await AccountModel.findByPk(accountID);

    if (account === null) {
      return null;
    }
    const cardsTest = await AccountCardDetailModel.findAll({
      where: {
        account_id: accountID,
      },
      order: [['performance', 'ASC']],
      limit: limit,
    });
    return cardsTest;
  },
  finishLearning: async (accountID, studiedCards) => {
    if (studiedCards.length === 0) {
      return false;
    }
    // process.env.TZ = 'Asia/Ho_Chi_Minh';
    const currentDateTime = DateService.getCurrentDateTime();

    const transaction = await sequelize.transaction();
    try {
      let learnedDecksList = [];
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
        // console.log('studiedCard', studiedCard);

        if (isCardStudied === false) {
          await AccountCardDetailModel.create(
            {
              account_id: accountID,
              card_id: studiedCard.id,
              last_reviewed_at: currentDateTime,
              performance: studiedCard.performance,
            },
            { transaction }
          );
          await AccountModel.update(
            {
              learned_card_count: sequelize.literal('learned_card_count + 1'),
            },
            {
              where: {
                id: accountID,
              },
              transaction,
            }
          );
          await CardModel.update(
            {
              learned_account_count: sequelize.literal('learned_account_count + 1'),
            },
            {
              where: {
                id: studiedCard.id,
              },
              transaction,
            }
          );
        } else {
          await AccountCardDetailModel.update(
            {
              last_reviewed_at: currentDateTime,
              performance: accountCardDetail.performance + studiedCard.performance,
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
        let currentStudiedDeckIDsIndex = learnedDecksList.findIndex((deck) => deck.id === studiedCard.deck_id);
        if (currentStudiedDeckIDsIndex === -1) {
          learnedDecksList.push({
            id: studiedCard.deck_id,
            learnedCardCount: 0,
          });
          currentStudiedDeckIDsIndex = learnedDecksList.length - 1;
        }
        if (isCardStudied === false) {
          // learnedDecksList[currentStudiedDeckIDsIndex].learnedCardCount += 1;
          learnedDecksList[currentStudiedDeckIDsIndex].learnedCardCount += 1;
        }
      }

      // console.log('learnedDecksList', learnedDecksList);
      // ** create or update learn_deck_count in account_deck_details table
      for (const learnedDeck of learnedDecksList) {
        // console.log('learnedDeck', learnedDeck);
        const deckId = learnedDeck.id;
        const learnedCardCount = learnedDeck.learnedCardCount;
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
          await DeckModel.update(
            {
              learned_account_count: sequelize.literal('learned_account_count + 1'),
            },
            {
              where: {
                id: deckId,
              },
              transaction,
            }
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
          await CoursesModel.update(
            {
              learned_account_count: sequelize.literal('learned_account_count + 1'),
            },
            {
              where: {
                id: courseID,
              },
              transaction,
            }
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

      const dayOfWeek = DateService.getCurrentDayOfWeek();

      // create or update learn_streak in learn_streaks table
      const learnStreak = await LearnStreakModel.findOne({
        where: {
          account_id: accountID,
        },
      });

      if (learnStreak === null) {
        await LearnStreakModel.create(
          {
            account_id: accountID,
            longest_learned_day_streak: 1,
            current_learned_day_streak: 1,
          },
          { transaction }
        );
      } else {
        const isTodayLearned = await WeeklyLearnTrackerModel.findOne({
          where: {
            account_id: accountID,
            day_of_week: DateService.getCurrentDayOfWeek(),
          },
        });
        if (isTodayLearned === null) {
          await LearnStreakModel.update(
            {
              current_learned_day_streak: learnStreak.current_learned_day_streak + 1,
              longest_learned_day_streak: Math.max(
                learnStreak.longest_learned_day_streak,
                learnStreak.current_learned_day_streak + 1
              ),
            },
            {
              where: {
                account_id: accountID,
              },
              transaction,
            }
          );
        }
      }

      // create weekly_learn_tracker in weekly_learn_trackers table
      const weeklyLearnTracker = await WeeklyLearnTrackerModel.findOne({
        where: {
          account_id: accountID,
          day_of_week: dayOfWeek,
        },
      });
      if (weeklyLearnTracker === null) {
        await WeeklyLearnTrackerModel.create(
          {
            account_id: accountID,
            day_of_week: dayOfWeek,
          },
          { transaction }
        );
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

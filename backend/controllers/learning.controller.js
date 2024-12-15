const learningService = require('../services/learning.service');
const http = require('http-status-codes');
const accountService = require('../services/account.service');

const learningController = {
  getCardsToStudyInDeck: async (req, res) => {
    try {
      const { account_id, deck_id } = req.query;
      if (!account_id || !deck_id) {
        return res.status(http.StatusCodes.BAD_REQUEST).json({ message: 'Missing required fields' });
      }
      const account = accountService.getAccountById(account_id);
      if (!account) {
        return res.status(http.StatusCodes.NOT_FOUND).json({ message: 'Account not found' });
      }
      const cardsToStudy = await learningService.getCardsToStudyInDeck(account_id, deck_id);

      return res.status(http.StatusCodes.OK).json(cardsToStudy);
    } catch (err) {
      console.log(err);
      res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  },
  getCardsToStudyInCourse: async (req, res) => {
    try {
      const { account_id, course_id } = req.query;
      if (!account_id || !course_id) {
        return res.status(http.StatusCodes.BAD_REQUEST).json({ message: 'Missing required fields' });
      }
      const account = accountService.getAccountById(account_id);
      if (!account) {
        return res.status(http.StatusCodes.NOT_FOUND).json({ message: 'Account not found' });
      }
      const cardsToStudy = await learningService.getCardsToStudyInCourse(account_id, course_id);

      return res.status(http.StatusCodes.OK).json(cardsToStudy);
    } catch (err) {
      console.log(err);
      res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  },
  getCardsToTest: async (req, res) => {
    try {
      const { account_id } = req.query;
      if (!account_id) {
        return res.status(http.StatusCodes.BAD_REQUEST).json({ message: 'Missing required fields' });
      }
      const account = accountService.getAccountById(account_id);
      if (!account) {
        return res.status(http.StatusCodes.NOT_FOUND).json({ message: 'Account not found' });
      }
      const cardsToTest = await learningService.getCardsToTest(account_id);

      return res.status(http.StatusCodes.OK).json(cardsToTest);
    } catch (err) {
      console.log(err);
      res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  },
  finishLearning: async (req, res) => {
    try {
      const { account_id, learned_cards } = req.body;
      if (!account_id || !learned_cards) {
        return res.status(http.StatusCodes.BAD_REQUEST).json({ message: 'Missing required fields' });
      }
      const account = accountService.getAccountById(account_id);
      if (!account) {
        return res.status(http.StatusCodes.NOT_FOUND).json({ message: 'Account not found' });
      }
      const result = await learningService.finishLearning(account_id, learned_cards);
      if (result === false) {
        return res.status(http.StatusCodes.BAD_REQUEST).json({ message: 'No cards to study' });
      }
      return res.status(http.StatusCodes.OK).json({ message: 'Finished learning' });
    } catch (err) {
      console.log(err);
      res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  },
};

module.exports = learningController;

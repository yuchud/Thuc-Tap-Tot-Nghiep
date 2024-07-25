const learningService = require('../services/learning.service');
const http = require('http-status-codes');
const accountService = require('../services/account.service');

const learningController = {
  finishLearning: (req, res) => {
    try {
      const { account_id, studied_card_IDs } = req.body;
      if (!account_id || !studied_card_IDs) {
        return res.status(http.StatusCodes.BAD_REQUEST).json({ message: 'Missing required fields' });
      }
      const account = accountService.getAccountById(account_id);
      if (!account) {
        return res.status(http.StatusCodes.NOT_FOUND).json({ message: 'Account not found' });
      }
      const result = learningService.finishLearning(account_id, studied_card_IDs);
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

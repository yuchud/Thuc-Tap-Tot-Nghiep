const WordClassService = require('../services/word-class.service');
const http = require('http-status-codes');

const WordClassController = {
  getAllWordClasses: async (req, res) => {
    try {
      const wordClasses = await WordClassService.getAllWordClasses();
      res.status(http.StatusCodes.OK).json(wordClasses);
    } catch (error) {
      console.log(error);
      res
        .status(http.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  },
};

module.exports = WordClassController;

const wordCLassModel = require('../models/word-class.model');

const WordClassService = {
  getAllWordClasses: async () => {
    try {
      return await wordCLassModel.findAll();
    } catch (error) {
      throw error;
    }
  },
};

module.exports = WordClassService;

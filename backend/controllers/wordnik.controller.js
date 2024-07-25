const wordnikService = require('../services/wordnik.service');
const http = require('http-status-codes');
const wordnikController = {
  getAudios: async (req, res) => {
    const { word } = req.params;
    try {
      const response = await wordnikService.getAudios(word);
      res.json(response);
    } catch (error) {
      res
        .status(http.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  },
  getPronunciations: async (req, res) => {
    const { word } = req.params;
    try {
      const response = await wordnikService.getPronunciations(word);
      res.json(response);
    } catch (error) {
      res
        .status(http.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  },
};

module.exports = wordnikController;

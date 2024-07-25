const axios = require('axios');
require('dotenv').config();
const WORDNIK_API_KEY = process.env.WORDNIK_API_KEY;
const WORDNIK_API_URL = 'https://api.wordnik.com/v4';

const useCanonical = false;

const wordnikService = {
  getAudios: async (word) => {
    try {
      const response = await axios.get(
        `${WORDNIK_API_URL}/word.json/${word}/audio?useCanonical=${useCanonical}&type=dictionary`,
        {
          params: {
            api_key: WORDNIK_API_KEY,
          },
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  },
  getPronunciations: async (word) => {
    try {
      const response = await axios.get(
        `${WORDNIK_API_URL}/word.json/${word}/pronunciations?useCanonical=${useCanonical}&type=dictionary`,
        {
          params: {
            api_key: WORDNIK_API_KEY,
          },
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  },
};

module.exports = wordnikService;

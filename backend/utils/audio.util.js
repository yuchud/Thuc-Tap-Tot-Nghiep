const axios = require('axios');
const fs = require('fs');
const path = require('path');

const audioUtil = {
  downloadAudio: async (url, filename) => {
    const filePath = path.join(__dirname, `../uploads/audios/${filename}`);
    const writer = fs.createWriteStream(filePath);
    // console.log('Downloading audio:', url);
    // console.log(filename);
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  },
};

module.exports = audioUtil;

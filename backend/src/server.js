require('dotenv').config();
const app = require('./app');
const appConfig = require('../config/app.config');

const server = app.listen(appConfig.PORT, (err) => {
    if (err) {
        console.error(`Error: ${err.message}`);
    }
    else {
        console.log(`Server is running on http://localhost:${appConfig.PORT}`);
    }
  });    

module.exports = server;
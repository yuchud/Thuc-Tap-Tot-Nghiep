require('dotenv').config();
const app = require('./app');
const appConfig = require('./config/app.config');
const jestConfig = require('./config/jest.config');

let port;
if (process.env.NODE_ENV === 'test') {
    port = jestConfig.testPort || appConfig.TEST_PORT;
} else {
    port = appConfig.DEV_PORT;
}

const server = app.listen(port, (err) => {
    if (err) {
        console.error(`Error: ${err.message}`);
    }
    else {
        console.log(`Server is running on http://localhost:${appConfig.PORT}`);
    }
  });    

module.exports = server;
require('dotenv').config();
module.exports = {
    testEnvironment: 'node', 
    testPort: process.env.TEST_PORT || 3001,
  };
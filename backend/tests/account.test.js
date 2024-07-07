const supertest = require('supertest');
const app = require('../src/app');
const server = require('../src/server');

describe('Account Controller Tests', () => {
    
  test('Should respond to a GET request', async () => {
    await supertest(app).get('/api/accounts/id/1')
      .expect(200) // Adjust expectations as necessary
      .then((response) => {
        // Perform assertions on the response
      });
  }); 

  
  afterAll(done => {
    server.close(done);
  }); // Close the server after the tests
});
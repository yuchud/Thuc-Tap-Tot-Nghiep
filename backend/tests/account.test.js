const supertest = require('supertest');
const app = require('../src/app');


describe('Account Controller Tests', () => {
    
  test('Should respond to a GET request', async () => {
    await supertest(app).get('/accounts/id/1')
      .expect(200) // Adjust expectations as necessary
      .then((response) => {
        // Perform assertions on the response
      });
  }); 

  
  afterAll(done => {
    app.server.close(done);
  }); // Close the server after the tests
});
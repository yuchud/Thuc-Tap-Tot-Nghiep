const supertest = require('supertest');
const app = require('../app');


describe('Account Controller Tests', () => {

  beforeAll(() => {
    server = app.listen(8765); // Start the server before the tests
 })

    
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
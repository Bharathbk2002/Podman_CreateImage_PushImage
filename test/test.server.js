const request = require('supertest');
const app = require('../server'); 

describe('Server Test', () => {

  it('should return Hello World for the root route', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect('Hello World!', done);
  });

  it('should return a JSON object with a greeting at /api/greet', (done) => {
    request(app)
      .get('/api/greet')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((res) => {
        if (!('message' in res.body)) throw new Error("Missing 'message' key");
      })
      .expect({ message: 'Greetings from the server!' }, done);
  });

});

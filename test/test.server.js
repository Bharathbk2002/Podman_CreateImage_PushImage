const request = require('supertest');
const app = require('../server'); 

describe('Server Test', () => {

  it('should return Hello World for the root route', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect('Hello World!', done);
  });

});

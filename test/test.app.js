const chai = require('chai');
const request = require('supertest');
const server = require('../app'); 

const { expect } = chai;

describe('GET /', () => {
  it('should return status 200 and "Hello, world!"', (done) => {
    request(server)
      .get('/')
      .expect(200) 
      .expect('Hello, world!') 
      .end(done); 
  });
});

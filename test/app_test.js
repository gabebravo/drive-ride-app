const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('The express app', () => {
  it('handles a GET request to /driver', (done) => {
    request(app)
      .get('/driver')
      .end( (err, response) => {
        assert(response.body.message === 'most basic get route');
        done();
      });
  });
});

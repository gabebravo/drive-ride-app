const assert = require('assert');
const request = require('supertest');
const app = require('../../app');

// we do this because using mongoose like this gets around express/mocha collisions
const mongoose = require('mongoose');
const Driver = mongoose.model('drivers'); // this is the collection name

describe('Driver routes', () => {

  it('handles a GET request to /driver', (done) => {
    request(app)
      .get('/driver')
      .end( (err, response) => {
        assert(response.body.message === 'most basic get route');
        done();
      });
  });

  it('handles a POST request to /driver/create', (done) => {
    request(app)
      .post('/driver/create')
      .send({ email: 'test@test.com' })
      .end( (err, response) => {
        assert(response.body.email === 'test@test.com');
        done();
      });
  });

});

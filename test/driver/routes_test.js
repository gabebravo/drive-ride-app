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
      .send({ email: 'test@test.com'})
      .end( (err, response) => {
        assert(response.body.message === 'The driver test@test.com was successfully saved');
        done();
      });
  });

  it('handles a PUT request to /driver/edit', (done) => {
    const updateTestDriver = new Driver({ email: 'test1@test.com', available: false })
      updateTestDriver.save().then(() => {
        request(app)
          .put('/driver/edit')
          .send({ email: 'test1@test.com', available: true })
          .end( (err, response) => {
             assert(response.body.message === 'you are availble to drive');
            done();
          });
      })
  });

  it('handles a DELETE request to /driver/delete', (done) => {
    const deleteTestDriver = new Driver({ email: 'test2@test.com' })
      deleteTestDriver.save().then(() => {
        request(app)
          .delete('/driver/delete?email=test2@test.com')
          .end( () => {
            Driver.findOne({ email: 'test2@test.com' })
              .then( driver => {
                assert(driver === null);
              })
            done();
          });
      })
  });

});

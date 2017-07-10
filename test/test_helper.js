const mongoose = require('mongoose');

before( done => {
  mongoose.connect('mongodb://localhost/drivers_test',  {
    useMongoClient: true, // weird new flag mongoose requires
  });
  mongoose.connection
    .once('open', () => done())
    .on('error', err => {
      console.warn('Warning', error);
    })
});

beforeEach( done => {
  const drivers = mongoose.connection.collections.drivers;
    drivers.drop()
      .then( () => drivers.ensureIndex({ // required for geoNear indices drop bug
        'geometry.coordinates': '2dsphere'
      }))
      .then(() => done())
      .catch(() =>  done());
});

const express = require('express');
const app = express();

// mongoose.Promise = global.Promise;
// if (process.env.NODE_ENV !== 'test') {
//   mongoose.connect('mongodb://localhost/muber');
// }

app.use(bodyParser.json());

// routes specific to driver CRUD
const driverRouter = require('./server/routes/driver');
  app.use('/driver', driverRouter);

module.exports = app;

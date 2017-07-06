const express = require('express');
const app = express();

// routes specific to driver CRUD
const driverRouter = require('./server/routes/driver');
  app.use('/driver', driverRouter);

module.exports = app;

const express = require('express');
const router = express.Router();

const Driver = require('../schemas/driver');

const getDrivers = (req, res) => {
  res.send({ message: 'most basic get route'});
}

const createDrivers = (req, res) => {
  console.log('hello world');
  console.log(req.query.email);
}

// routes
router.get('/', getDrivers);
router.post('/create', createDrivers);

//export routes
module.exports = router;

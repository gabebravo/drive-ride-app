const express = require('express');
const router = express.Router();

const getDrivers = (req, res) => {
  res.send({ message: 'most basic get route'});
}

// routes
router.get('/', getDrivers);

//export routes
module.exports = router;

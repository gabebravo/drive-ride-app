const express = require('express');
const router = express.Router();

const Driver = require('../schemas/driver');

const getDrivers = (req, res) => {
  res.send({ message: 'most basic get route'});
}

const createDrivers = (req, res) => {
  const newDriver = new Driver({
    email: req.body.email
  });
  newDriver.save()
  .then( () => {
    res.status(200).json({ message: `The driver ${req.body.email} was successfully saved` });
  })
  .catch( error => {
    console.log(error);
    res.status(400).json({ message: error.message });
  })
}

const editDriver = ( req, res ) => {
  Driver.findOneAndUpdate({ email: req.body.email }, req.body)
    .then( () => Driver.findOne({ email: req.body.email }) )
    .then( driver => {
      const availablityStatus = driver.available ?
        `you are availble to drive` : `you are no longer availble to drive`;
      res.status(200).json({ message: availablityStatus})
    })
    .catch( error => {
      console.log(error);
      res.status(400).json({ message: error.message });
    })
}

const deleteDriver = (req, res) => {
  Driver.findOneAndRemove({ email: req.query.email })
    .then( () => {
      res.status(200).json({ message: `driver with email ${req.query.email} was deleted`})
    })
    .catch( error => {
      console.log(error);
      res.status(400).json({ message: error.message });
    })
}

// routes
router.get('/', getDrivers);
router.post('/create', createDrivers);
router.put('/edit', editDriver);
router.delete('/delete', deleteDriver);

//export routes
module.exports = router;

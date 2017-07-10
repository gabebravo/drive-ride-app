const express = require('express');
const router = express.Router();

const Driver = require('../schemas/driver');

const getConnected = (req, res) => {
  res.send({ message: 'most basic get route'});
}

const getDrivers = (req, res) => {
  const lng = Number(req.query.lng), lat = Number(req.query.lat);

  Driver.geoNear(
    { type: 'Point', coordinates: [lng, lat] },
    { 'spherical': true, maxDistance: 200000 } // distance is in meters 200k = 2kms
  )
  .then( drivers => {
    res.status(200).json({ drivers: drivers });
  })
  .catch( error => {
    console.log(error);
    res.status(400).json({ message: error.message });
  })
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
router.get('/start', getConnected);

router.post('/create', createDrivers);
router.put('/edit', editDriver);
router.delete('/delete', deleteDriver);
router.get('/', getDrivers);

//export routes
module.exports = router;

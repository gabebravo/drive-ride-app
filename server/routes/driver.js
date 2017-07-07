const express = require('express');
const router = express.Router();

const Driver = require('../schemas/driver');

const getDrivers = (req, res) => {
  res.send({ message: 'most basic get route'});
}

const createDrivers = (req, res) => {
  const driverProps = req.body;

  Driver.create(driverProps)
    .then( driver => {
      res.send(driver);
    });

  // const newDriver = new Driver({
  //   email: req.body.email
  // });
  // newDriver.save()
  // .then( () => {
  //   res.status(200).json({ message: 'The driver that you added was successfully saved' });
  // })
  // .catch( error => {
  //   console.log(error);
  //   res.status(400).json({ message: 'Your request could not be processed' });
  // })
}

// routes
router.get('/', getDrivers);
router.post('/create', createDrivers);

//export routes
module.exports = router;

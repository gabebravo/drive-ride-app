const express = require('express');
const app = express();

module.exports = app;

app.get('/api', (req, res) => {
  res.send({ message: 'most basic get route'});
});

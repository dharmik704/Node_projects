const express = require('express');

const routs = express.Router();

routs.use('/movies', require('./movie'));

module.exports = routs;
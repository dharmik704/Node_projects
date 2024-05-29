const express = require('express');

const routes = express.Router();

routes.use('/Admin', require('./admin'));

routes.use('/Manager', require('./manager'));

routes.use('/Employee', require('./employee'));

module.exports = routes;
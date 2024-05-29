const express = require('express');

const routes = express.Router();

routes.use('/admin', require('./admin'));

routes.use('/doctor', require('./Doctor/doctor'));

routes.use('/user', require('./User/user'));

module.exports = routes;
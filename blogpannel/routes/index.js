const express =  require('express');

const routs = express.Router();

routs.use('/admin', require('./admin'));

routs.use('/', require('./user'));

module.exports = routs;
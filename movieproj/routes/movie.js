const express = require('express');

const routs = express.Router();

const movie = require('../models/movies');

const moviectrl = require('../controllers/moviectrl');

routs.get('/showmovies', moviectrl.showmovie);

routs.get('/addmovie', moviectrl.addmovie);

routs.post('/insertmovie', movie.uploadimage ,moviectrl.insertmovie);

routs.get('/showmoviedetails', moviectrl.showmoviedetails);


module.exports = routs;
const express =  require('express');

const routs = express.Router();

const sliderctrl = require('../controllers/sliderctrl');

const slider = require('../models/sliderdata');

routs.get('/add_slider', sliderctrl.addslider);

routs.post('/insertslider', slider.uploadimage, sliderctrl.insertslider);

routs.get('/view_slider', sliderctrl.viewslider);

routs.get('/deleteslider/:id', sliderctrl.deleteslider);

routs.get('/updateslider', sliderctrl.updateslider);

routs.post('/editslider/:id', slider.uploadimage, sliderctrl.editslider);

routs.get('/deactive/:id', sliderctrl.deactive);

routs.get('/active/:id', sliderctrl.active);

routs.post('/deletemultislider', sliderctrl.deletemultislider);

module.exports = routs;
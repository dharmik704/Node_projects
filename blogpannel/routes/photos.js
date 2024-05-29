const express =  require('express');

const routs = express.Router();

const photosctrl = require('../controllers/photoctrl');

const photos = require('../models/photosdata');

routs.get('/add_photos', photosctrl.addphotos);

routs.post('/insertphotos', photos.uploadimage, photosctrl.insertphotos);

routs.get('/view_photos', photosctrl.viewphotos);

routs.get('/deletephotos/:id', photosctrl.deletephotos);

routs.get('/updatephotos', photosctrl.updatephotos);

routs.post('/editphotos/:id', photos.uploadimage, photosctrl.editphotos);

module.exports = routs;
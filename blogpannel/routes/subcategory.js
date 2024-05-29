const express =  require('express');

const routs = express.Router();

const subcategoryctrl = require('../controllers/subcategoryctrl');

const subcategory = require('../models/subcategorydata');

routs.get('/add_subcategory', subcategoryctrl.addsubcategory);

routs.post('/insertsubcategory', subcategory.uploadimage, subcategoryctrl.insertsubcategory);

routs.get('/view_subcategory', subcategoryctrl.viewsubcategory);

module.exports = routs;
const express =  require('express');

const routs = express.Router();

const categoryctrl = require('../controllers/categoryctrl');

routs.get('/add_category', categoryctrl.addcategory);

routs.post('/insertcategory', categoryctrl.insertcategory);

routs.get('/view_category', categoryctrl.viewcategory);

module.exports = routs;
const express =  require('express');

const routs = express.Router();

const reviewctrl = require('../controllers/reviewctrl');

routs.get('/add_reviews', reviewctrl.addreviews);

routs.post('/insertreviews', reviewctrl.insertreviews);

routs.get('/view_reviews', reviewctrl.viewreviews);

routs.get('/deletereview/:id', reviewctrl.deletereview);

routs.get('/updatereview', reviewctrl.updatereview);

routs.post('/editreviews/:id', reviewctrl.editreviews);

module.exports = routs;
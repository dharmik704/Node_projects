const express =  require('express');

const routs = express.Router();

const offerctrl = require('../controllers/offerctrl');

routs.get('/add_offer', offerctrl.addoffer);

routs.post('/insertoffer', offerctrl.insertoffer);

routs.get('/view_offer', offerctrl.viewoffer);

routs.get('/deleteoffer/:id', offerctrl.deleteoffer);

routs.get('/updateoffer', offerctrl.updateoffer);

routs.post('/editoffer/:id', offerctrl.editoffer);

routs.get('/deactive/:id', offerctrl.deactive);

routs.get('/active/:id', offerctrl.active);

routs.post('/deletemultioffer', offerctrl.deletemultioffer);

module.exports = routs;
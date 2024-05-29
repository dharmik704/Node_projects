const express =  require('express');

const routs = express.Router();

const contactusctrl = require('../controllers/contactusctrl');

routs.get('/view_message', contactusctrl.viewmessage);

routs.get('/viewcontact/:id', contactusctrl.viewcontact);

routs.post('/sendmail/:id', contactusctrl.sendmail);

routs.get('/deactive/:id', contactusctrl.deactive);

module.exports = routs;
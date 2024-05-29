const express =  require('express');

const routs = express.Router();

const userctrl = require('../controllers/userctrl');

const comment = require('../models/commentdata');

routs.get('/', userctrl.index);

routs.get('/readmore', userctrl.readmore);

routs.post('/addcomment', comment.uploadimage , userctrl.addcomment);

routs.post('/addcomment', comment.uploadimage , userctrl.addcomment);

routs.get('/work-three-column', userctrl.workthreecolumn);

routs.get('/four-three-column', userctrl.fourthreecolumn);

routs.get('/blog', userctrl.blog);

routs.get('/about', userctrl.about);

routs.get('/contact', userctrl.contact);

routs.post('/addmessage', userctrl.addmessage);

module.exports = routs;
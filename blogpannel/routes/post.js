const express =  require('express');

const routs = express.Router();

const postctrl = require('../controllers/postctrl');

const post = require('../models/postdata');

routs.get('/add_post', postctrl.addpost);

routs.post('/insertpost', post.uploadimage, postctrl.insertpost);

routs.get('/view_post', postctrl.viewpost);

routs.get('/deletepost/:id', postctrl.deletepost);

routs.get('/updatepost', postctrl.updatepost);

routs.post('/editpost/:id', post.uploadimage, postctrl.editpost);

routs.get('/deactive/:id', postctrl.deactive);

routs.get('/active/:id', postctrl.active);

routs.post('/deletemultipost', postctrl.deletemultipost);

module.exports = routs;
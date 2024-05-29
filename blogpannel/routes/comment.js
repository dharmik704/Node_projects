const express =  require('express');

const routs = express.Router();

const commentctrl = require('../controllers/commentctrl');

routs.get('/view_comment', commentctrl.viewcomment);

module.exports = routs;
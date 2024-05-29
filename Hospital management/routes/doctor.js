const express = require('express');

const routes = express.Router();

const doctorctrl = require('../controllers/doctorctrl');

const doctor = require('../models/doctormdl');

routes.get('/add_doctor', doctorctrl.adddoctor);

routes.post('/insertdoctor', doctor.uploadimage, doctorctrl.insertdoctor);

routes.get('/view_doctor', doctorctrl.viewdoctor);

routes.get('/deletedoctor/:id', doctorctrl.deletedoctor);

routes.get('/showdoctor/:id', doctorctrl.showdoctor);

routes.get('/deactive/:id', doctorctrl.deactive);

routes.get('/active/:id', doctorctrl.active);

module.exports = routes;
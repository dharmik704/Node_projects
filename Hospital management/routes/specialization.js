const express = require('express');

const routes = express.Router();

const specializationctrl = require('../controllers/specializationctrl');

routes.get('/add_specialization', specializationctrl.addspecialization);

routes.post('/insertspecialization', specializationctrl.insertspecialization);

routes.get('/view_specialization', specializationctrl.viewspecialization);

routes.get('/deletespecialization/:id', specializationctrl.deletespecialization);

routes.get('/deactive/:id', specializationctrl.deactive);

routes.get('/active/:id', specializationctrl.active);

module.exports = routes;
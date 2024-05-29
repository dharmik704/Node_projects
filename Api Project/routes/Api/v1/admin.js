const express = require('express');

const routes = express.Router();

const manager = require('../../../models/managermdl');

const adminctrl = require('../../../controllers/Api/v1/adminctrl');

const passport = require('passport');

routes.post('/register', adminctrl.register);

routes.post('/login', adminctrl.login);

routes.post('/addmanager', passport.authenticate("adminjwt", { failureRedirect: '/Api/Admin/faillogin' }), manager.uploadimage, adminctrl.addmanager);

routes.delete('/deletemanager/:id', passport.authenticate("adminjwt", { failureRedirect: '/Api/Admin/faillogin' }), adminctrl.deletemanager);

routes.get('/viewmanager', passport.authenticate("adminjwt", { failureRedirect: '/Api/Admin/faillogin' }), adminctrl.viewmanager);

routes.get('/viewemployee', passport.authenticate("adminjwt", { failureRedirect: '/Api/Admin/faillogin' }), adminctrl.viewemployee);

routes.delete('/deleteemployee/:id', passport.authenticate("adminjwt", { failureRedirect: '/Api/Admin/faillogin' }), adminctrl.deleteemployee);

routes.get('/faillogin', async (req, res) => {
    return res.status(400).json({ msg: 'Please First Login', status: 0, responce: 'error' });
})

module.exports = routes;
const express = require('express');

const routes = express.Router();

const managerctrl = require('../../../controllers/Api/v1/managerctrl');

const passport = require('passport');

const manager = require('../../../models/managermdl');

routes.post('/login', managerctrl.login);

routes.get('/profile', passport.authenticate("managerjwt",{failureRedirect: '/Api/Manager/faillogin'}), managerctrl.profile);

routes.put('/updateprofile/:id', passport.authenticate("managerjwt",{failureRedirect: '/Api/Manager/faillogin'}), manager.uploadimage, managerctrl.updateprofile);

routes.post('/addemployee', passport.authenticate("managerjwt",{failureRedirect: '/Api/Manager/faillogin'}), managerctrl.addemployee);

routes.get('/viewemployee', passport.authenticate("managerjwt",{failureRedirect: '/Api/Manager/faillogin'}), managerctrl.viewemployee);

routes.delete('/deleteemployee/:id', passport.authenticate("managerjwt",{failureRedirect: '/Api/Manager/faillogin'}), managerctrl.deleteemployee);

routes.get('/faillogin', async (req, res) => {
    return res.status(400).json({msg: 'Please First Login',status:0,responce:'error'});
})

module.exports = routes;
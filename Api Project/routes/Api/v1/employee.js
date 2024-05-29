const express = require('express');

const routes = express.Router();

const emplctrl = require('../../../controllers/Api/v1/employeectrl');

const passport = require('passport');

routes.post('/login', emplctrl.login);

routes.get('/profile', passport.authenticate("employeejwt",{failureRedirect: '/Api/Employee/faillogin'}), emplctrl.profile);

routes.put('/updateprofile/:id', passport.authenticate("employeejwt",{failureRedirect: '/Api/Employee/faillogin'}), emplctrl.updateprofile);

routes.get('/faillogin', async (req, res) => {
    return res.status(400).json({msg: 'Please First Login',status:0,responce:'error'});
})

module.exports = routes;
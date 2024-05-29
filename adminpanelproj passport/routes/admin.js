const express = require('express');

const routes = express.Router();

const admin = require('../models/admindata');

const adminctrl = require('../controllers/adminctrl');

const passport = require('../config/passportlocal');

routes.get('/', adminctrl.login);

routes.post('/login', passport.authenticate('local',{failureRedirect: '/admin'}), adminctrl.checklogin);

routes.get('/logout', (req,res) => {
    req.session.destroy((err) => {
        if(err){
            console.log(err);
            return res.redirect('back');
        }
        else{
            return res.redirect('/admin');
        }
    })
});

routes.get('/dashboard', passport.checkAuth, adminctrl.dashboard);

routes.get('/add_admin', passport.checkAuth, adminctrl.addadmin);

routes.post('/insertadmin', passport.checkAuth, admin.uploadimage , adminctrl.insertadmin);

routes.get('/view_admin', passport.checkAuth, adminctrl.viewadmin);

routes.get('/deleteadmin', passport.checkAuth, adminctrl.deleteadmin);

routes.get('/updateadmin', passport.checkAuth, adminctrl.updateadmin);

routes.post('/editadmin/:id', passport.checkAuth, admin.uploadimage, adminctrl.editadmin);

routes.get('/profile', passport.checkAuth, adminctrl.profile);

routes.get('/changepassword', passport.checkAuth, adminctrl.changepassword);

routes.post('/editpassword', passport.checkAuth, adminctrl.editpassword);

// forgot password code

routes.get('/fogotpass', adminctrl.forgotpassword);

routes.post('/verifyemail', adminctrl.verifyemail);

routes.get('/otp', adminctrl.otp);

routes.post('/verifyotp', adminctrl.verifyotp);

routes.get('/newpassword', adminctrl.newpassword);

routes.post('/checkpass', adminctrl.checkpass);

// end of forgot password code

module.exports = routes;
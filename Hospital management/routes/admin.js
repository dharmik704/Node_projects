const express = require('express');

const routes = express.Router();

const adminctrl = require('../controllers/adminctrl');

const admin = require('../models/adminmdl');

const passport = require('passport');

routes.get('/', adminctrl.login);

routes.post('/checklogin', passport.authenticate('local', {failureRedirect: '/admin'}), adminctrl.checklogin)

routes.get('/logout', async (req,res) => {
    req.session.destroy((err) => {
        if(err){
            console.log(err);
            req.flash('error', 'Somethig went wrong!');
            return res.redirect('back');
        }
        else{
            return res.redirect('/admin');
        }
    });
})

routes.get('/dashboard', passport.checkAuth, adminctrl.dashboard);

routes.get('/add_admin', passport.checkAuth, adminctrl.addadmin);

routes.post('/insertadmin', passport.checkAuth, admin.uploadimage, adminctrl.insertadmin);

routes.get('/view_admin', passport.checkAuth, adminctrl.viewadmin);

routes.get('/deleteadmin', passport.checkAuth, adminctrl.deleteadmin);

routes.get('/updateadmin', passport.checkAuth, adminctrl.updateadmin);

routes.post('/editadmin/:id', passport.checkAuth, admin.uploadimage, adminctrl.editadmin);

routes.get('/profile', passport.checkAuth, adminctrl.profile);

routes.get('/changepassword', passport.checkAuth, adminctrl.changepassword);

routes.post('/editpassword', passport.checkAuth, adminctrl.editpassword);

routes.get('/deactive/:id', passport.checkAuth, adminctrl.deactive);

routes.get('/active/:id', passport.checkAuth, adminctrl.active);

// forgot password code

routes.get('/forgotpass', adminctrl.forgotpass);

routes.post('/verifyemail', adminctrl.verifyemail);

routes.get('/verifyotp', adminctrl.verifyotp);

routes.post('/checkotp', adminctrl.checkotp);

routes.get('/changepass', adminctrl.changepass);

routes.post('/editpass', adminctrl.editpass);

// end of forgot password code

routes.use('/specialization', passport.checkAuth, require('./specialization'));

routes.use('/doctor', passport.checkAuth, require('./doctor'));

module.exports = routes;
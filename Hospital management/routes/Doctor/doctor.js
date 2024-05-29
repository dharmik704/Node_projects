const express = require('express');

const routes = express.Router();

const doctorctrl = require('../../controllers/Doctor/doctorctrl');

const passport = require('passport');

const doctor = require('../../models/doctormdl');

routes.get('/', doctorctrl.login);

routes.post('/checklogin', passport.authenticate('doctor', {failureRedirect: '/doctor'}), doctorctrl.checklogin);

routes.get('/logout', async (req,res) => {
    req.session.destroy((err) => {
        if(err){
            console.log(err);
            req.flash('error', 'Somethig went wrong!');
            return res.redirect('back');
        }
        else{
            return res.redirect('/doctor');
        }
    });
})

routes.get('/dashboard', passport.doccheckAuth, doctorctrl.dashboard);

// routes.get('/add_admin', passport.checkAuth, adminctrl.addadmin);

// routes.post('/insertadmin', passport.checkAuth, admin.uploadimage, adminctrl.insertadmin);

// routes.get('/view_admin', passport.checkAuth, adminctrl.viewadmin);

// routes.get('/deleteadmin', passport.checkAuth, adminctrl.deleteadmin);

// routes.get('/updateadmin', passport.checkAuth, adminctrl.updateadmin);

routes.get('/profile', passport.doccheckAuth, doctorctrl.profile);

routes.get('/updateprofile/:id', passport.doccheckAuth, doctorctrl.updateprofile);

routes.post('/editprofile/:id', doctor.uploadimage, passport.doccheckAuth, doctorctrl.editprofile);

routes.get('/changepassword', passport.doccheckAuth, doctorctrl.changepassword);

routes.post('/editpassword', passport.doccheckAuth, doctorctrl.editpassword);

// routes.get('/deactive/:id', passport.checkAuth, adminctrl.deactive);

// routes.get('/active/:id', passport.checkAuth, adminctrl.active);

// forgot password code

routes.get('/forgotpass', doctorctrl.forgotpass);

routes.post('/verifyemail', doctorctrl.verifyemail);

routes.get('/verifyotp', doctorctrl.verifyotp);

routes.post('/checkotp', doctorctrl.checkotp);

routes.get('/changepass', doctorctrl.changepass);

routes.post('/editpass', doctorctrl.editpass);

// end of forgot password code

// routes.use('/specialization', passport.checkAuth, require('./specialization'));

// routes.use('/doctor', passport.checkAuth, require('./doctor'));

module.exports = routes;
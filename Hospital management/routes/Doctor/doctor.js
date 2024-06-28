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

routes.get('/add_time', passport.doccheckAuth, doctorctrl.add_time);

routes.post('/savetime', passport.doccheckAuth, doctorctrl.savetime);

routes.get('/view_time', passport.doccheckAuth, doctorctrl.view_time);

routes.get('/viewappointment', passport.doccheckAuth, doctorctrl.viewappointment);

routes.get('/updatetime/:id', passport.doccheckAuth, doctorctrl.updatetime);

routes.post('/edittime/:id', passport.doccheckAuth, doctorctrl.edittime);

routes.get('/profile', passport.doccheckAuth, doctorctrl.profile);

routes.get('/updateprofile/:id', passport.doccheckAuth, doctorctrl.updateprofile);

routes.post('/editprofile/:id', doctor.uploadimage, passport.doccheckAuth, doctorctrl.editprofile);

routes.get('/changepassword', passport.doccheckAuth, doctorctrl.changepassword);

routes.post('/editpassword', passport.doccheckAuth, doctorctrl.editpassword);

routes.get('/deactive/:id', passport.doccheckAuth, doctorctrl.deactive);

routes.get('/active/:id', passport.doccheckAuth, doctorctrl.active);

routes.get('/addpatientdetail/:id', passport.doccheckAuth, doctorctrl.addpatientdetail);

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
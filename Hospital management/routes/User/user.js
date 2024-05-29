const express = require('express');

const routes = express.Router();

const userctrl = require('../../controllers/User/userctrl');

// const user = require('../../models/usersmdl');

const passport = require('passport');

routes.get('/', userctrl.login);

routes.get('/signup', userctrl.signup);

routes.post('/adduser', userctrl.adduser);

routes.post('/checklogin', passport.authenticate('user', {failureRedirect: '/user'}), userctrl.checklogin);

routes.get('/logout', async (req,res) => {
    req.session.destroy((err) => {
        if(err){
            console.log(err);
            req.flash('error', 'Somethig went wrong!');
            return res.redirect('back');
        }
        else{
            return res.redirect('/user');
        }
    });
})

routes.get('/dashboard', passport.usercheckAuth, userctrl.dashboard);

// routes.get('/add_admin', passport.checkAuth, adminctrl.addadmin);

// routes.get('/view_admin', passport.checkAuth, adminctrl.viewadmin);

// routes.get('/deleteadmin', passport.checkAuth, adminctrl.deleteadmin);

// routes.get('/updateadmin', passport.checkAuth, adminctrl.updateadmin);

routes.get('/profile', passport.usercheckAuth, userctrl.profile);

routes.get('/updateprofile/:id', passport.usercheckAuth, userctrl.updateprofile);

routes.post('/editprofile/:id', passport.usercheckAuth, userctrl.editprofile);

routes.get('/changepassword', passport.usercheckAuth, userctrl.changepassword);

routes.post('/editpassword', passport.usercheckAuth, userctrl.editpassword);

// routes.get('/deactive/:id', passport.checkAuth, adminctrl.deactive);

// routes.get('/active/:id', passport.checkAuth, adminctrl.active);

// forgot password code

// routes.get('/forgotpass', doctorctrl.forgotpass);

// routes.post('/verifyemail', doctorctrl.verifyemail);

// routes.get('/verifyotp', doctorctrl.verifyotp);

// routes.post('/checkotp', doctorctrl.checkotp);

// routes.get('/changepass', doctorctrl.changepass);

// routes.post('/editpass', doctorctrl.editpass);

// end of forgot password code

// routes.use('/specialization', passport.checkAuth, require('./specialization'));

// routes.use('/doctor', passport.checkAuth, require('./doctor'));

module.exports = routes;
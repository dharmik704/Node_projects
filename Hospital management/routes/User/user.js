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

routes.get('/bookapointment', passport.usercheckAuth, userctrl.bookapointment);

routes.get('/takeappointment/:id', passport.usercheckAuth, userctrl.takeappointment);

routes.post('/confirmappointment/:id', passport.usercheckAuth, userctrl.confirmappointment);

routes.get('/viewapointment', passport.usercheckAuth, userctrl.viewapointment);

routes.get('/profile', passport.usercheckAuth, userctrl.profile);

routes.get('/updateprofile/:id', passport.usercheckAuth, userctrl.updateprofile);

routes.post('/editprofile/:id', passport.usercheckAuth, userctrl.editprofile);

routes.get('/changepassword', passport.usercheckAuth, userctrl.changepassword);

routes.post('/editpassword', passport.usercheckAuth, userctrl.editpassword);

routes.get('/deactive/:id', passport.usercheckAuth, userctrl.deactive);

// routes.get('/active/:id',  passport.usercheckAuth, userctrl.active);

// forgot password code

routes.get('/forgotpass', userctrl.forgotpass);

routes.post('/verifyemail', userctrl.verifyemail);

routes.get('/verifyotp', userctrl.verifyotp);

routes.post('/checkotp', userctrl.checkotp);

routes.get('/changepass', userctrl.changepass);

routes.post('/editpass', userctrl.editpass);

// end of forgot password code

// routes.use('/specialization', passport.checkAuth, require('./specialization'));

// routes.use('/doctor', passport.checkAuth, require('./doctor'));

module.exports = routes;
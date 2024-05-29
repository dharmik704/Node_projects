const express =  require('express');

const routs = express.Router();

const admin = require('../models/admindata');

const adminctrl = require('../controllers/adminctrl');

const passport = require('../config/pasportlocal');

routs.get('/', adminctrl.login);

routs.get('/logout', (req,res)=>{
    req.session.destroy((err) => {
        if(err){
            console.log(err);
            req.flash('error', 'Somethig Went Wrong');
            return res.redirect('back');
        }
        else{
            return res.redirect('/admin');
        }
    });
})

routs.post('/chacklogin' , passport.authenticate('local',{failureRedirect: '/admin'}) , adminctrl.checklogin);

routs.get('/dashboard', passport.checkAuth ,adminctrl.dashboard);

routs.get('/add_admin', passport.checkAuth ,adminctrl.addadmin);

routs.get('/view_admin', passport.checkAuth ,passport.checkAuth ,adminctrl.viewadmin);

routs.post('/insertadmin', passport.checkAuth ,admin.uploadimage, adminctrl.inseradmin);

routs.get('/deleteadmin/:id', passport.checkAuth ,adminctrl.deleteadmin);

routs.get('/updateadmin', passport.checkAuth ,adminctrl.updateadmin);

routs.post('/editadmin/:id', passport.checkAuth ,admin.uploadimage, adminctrl.editadmin);

routs.get('/profile', passport.checkAuth ,adminctrl.profile);

routs.get('/changepassword', passport.checkAuth ,adminctrl.changepassword);

routs.post('/chpass', passport.checkAuth ,adminctrl.editpassword);

routs.get('/deactive/:id', passport.checkAuth, adminctrl.deactive);

routs.get('/active/:id', passport.checkAuth, adminctrl.active);

routs.post('/deletemultiadmin', passport.checkAuth, adminctrl.deletemultiadmin);

// forgot password cod

routs.get('/forgotpass', adminctrl.forgotpass);

routs.post('/verifyemail', adminctrl.verifyemail);

routs.get('/add_otp', adminctrl.addotp);

routs.post('/verifyotp', adminctrl.verifyotp);

routs.get('/changenewpass', adminctrl.changenewpass);

routs.post('/addnewpass', adminctrl.addnewpass);

// end cod forgot password

routs.use('/slider', passport.checkAuth, require('./slider'));

routs.use('/offer', passport.checkAuth, require('./offer'));

routs.use('/post', passport.checkAuth, require('./post'));

routs.use('/photos', passport.checkAuth, require('./photos'));

routs.use('/reviews', passport.checkAuth, require('./review'));

routs.use('/comment', passport.checkAuth, require('./comment'));

routs.use('/category', passport.checkAuth, require('./category'));

routs.use('/subcategory', passport.checkAuth, require('./subcategory'));

routs.use('/contact-us', passport.checkAuth, require('./contactus'));

module.exports = routs;
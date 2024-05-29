const passport = require('passport');

const localstrategy = require('passport-local').Strategy;

const admin = require('../models/adminmdl');

const doctor = require('../models/doctormdl');

const user = require('../models/usersmdl');

// admin
passport.use(new localstrategy({
    usernameField: 'email',
}, async (email,password,done) => {
    let checkemail = await admin.findOne({email: email, status: true});
    if(checkemail){
        if(checkemail.password == password){
            return done(null, checkemail);
        }
        else{
            return done(null, false);
        }
    }
    else{
        return done(null, false);
    }
}));

// doctor
passport.use('doctor', new localstrategy({
    usernameField: 'email',
}, async (email,password,done) => {
    let checkemail = await doctor.findOne({email: email, status: true});
    if(checkemail){
        if(checkemail.password == password){
            return done(null, checkemail);
        }
        else{
            return done(null, false);
        }
    }
    else{
        return done(null, false);
    }
}));

// user

passport.use('user', new localstrategy({
    usernameField: 'email',
}, async (email,password,done) => {
    let checkemail = await user.findOne({email: email, status: true});
    if(checkemail){
        if(checkemail.password == password){
            return done(null, checkemail);
        }
        else{
            return done(null, false);
        }
    }
    else{
        return done(null, false);
    }
}));

passport.serializeUser((user,done) => {
    return done(null, user.id);
});

passport.deserializeUser(async (id,done) => {
    let admindata = await admin.findById(id);
    let docdata = await doctor.findById(id).populate('specializationid').exec();
    let userdata = await user.findById(id);
    if(admindata){
        return done(null, admindata);
    }
    else if(docdata){
        return done(null, docdata);
    }
    else if(userdata){
        return done(null, userdata);
    }
    else{
        return done(null, false);
    }
});

// admin
passport.setAuth = (req,res,next) => {
    if(req.isAuthenticated()){
        res.locals.admin = req.user;
    }
    next();
}

// doctor
passport.docsetAuth = (req,res,next) => {
    if(req.isAuthenticated()){
        res.locals.doctor = req.user;
    }
    next();
}

// user
passport.usersetAuth = (req,res,next) => {
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

// admin
passport.checkAuth = (req,res,next) => {
    if(req.isAuthenticated()){
        next();
    }
    else{
        return res.redirect('/admin');
    }
}

// doctor
passport.doccheckAuth = (req,res,next) => {
    if(req.isAuthenticated()){
        next();
    }
    else{
        return res.redirect('/doctor');
    }
}

// user
passport.usercheckAuth = (req,res,next) => {
    if(req.isAuthenticated()){
        next();
    }
    else{
        return res.redirect('/user');
    }
}

module.exports = passport;
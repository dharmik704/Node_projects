const passport = require('passport');

const localstrategy = require('passport-local').Strategy;

const admin = require('../models/admindata');

passport.use(new localstrategy({
    usernameField: 'email',
}, async (email,password,done) => {
    let checkemail = await admin.findOne({email: email});
    if(checkemail){
        if(checkemail.password == password){
            return done(null, checkemail);
        }
        else{
            return done(null,false);
        }
    }
    else{
        return done(null,false);
    }
}))

passport.serializeUser(async (user,done) => {
    return done(null, user.id);
})

passport.deserializeUser(async (id,done) => {
    let checkdata = await admin.findById(id);
    if(checkdata){
        return done(null, checkdata);
    }
    else{
        return done(null, false);
    }
})

passport.setAuth = (req,res,next) => {
    if(req.isAuthenticated()){
       res.locals.admin = req.user
    }
    next();
}

passport.checkAuth = (req,res,next) => {
    if(req.isAuthenticated()){
        next();
    }
    else{
        return res.redirect('/admin');
    }
}

module.exports = passport;
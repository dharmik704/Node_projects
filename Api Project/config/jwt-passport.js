const passport = require('passport');

const admin = require('../models/adminmdl');

const manager = require('../models/managermdl');

const employee = require('../models/employeemdl');

const jwtstrategy = require('passport-jwt').Strategy;

const jwtextrect = require('passport-jwt').ExtractJwt;

var opts = {
    jwtFromRequest : jwtextrect.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'admin'
}

passport.use('adminjwt', new jwtstrategy(opts, async (payload,done) => {
    let admindata = await admin.findById(payload.Admin._id);
    if(admindata){
        return done(null, admindata);
    }
    else{
        return done(null, false);
    }
}))

passport.serializeUser((user,done) => {
    return done(null, user.id);
});

passport.deserializeUser(async (id,done) => {
    let checkdata = await admin.findById(id);
    if(checkdata){
        return done(null, checkdata);
    }
    else{
        return done(null, false);
    }
});

var manopts = {
    jwtFromRequest : jwtextrect.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'manager'
}

passport.use('managerjwt', new jwtstrategy(manopts, async (payload,done) => {
    let managerdata = await manager.findById(payload.Manager._id);
    if(managerdata){
        return done(null, managerdata);
    }
    else{
        return done(null, false);
    }
}))

var empopts = {
    jwtFromRequest : jwtextrect.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'employee'
}

passport.use('employeejwt', new jwtstrategy(empopts, async (payload,done) => {
    let empdata = await employee.findById(payload.Employee._id);
    if(empdata){
        return done(null, empdata);
    }
    else{
        return done(null, false);
    }
}))

module.exports = passport;
const express = require('express');

const port = 8005;

const app = express();

const db = require('./config/mongoose');

const passport = require('passport');
const jwt = require('passport-jwt');
const jwtpassport = require('./config/jwt-passport');

const session = require('express-session');

app.use(express.urlencoded());

app.use(session({
    name: 'Admin',
    secret: 'admin',
    resave: true,
    saveUninitialized: true,
    cookie:{
        maxAge: 36000,
    }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/Api', require('./routes/Api/v1'));

app.listen(port, (err) => {
    if(err){
        console.log(err);
        return false;
    }
    console.log('server is running on port: ',port);
})

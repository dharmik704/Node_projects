const express = require('express');

const port = 8005;

const app = express();

const path = require('path');

const db = require('./config/mongoose');

const cp = require('cookie-parser');

const passport = require('passport');
const passportlocal = require('./config/passportlocal');

const session = require('express-session');

const flashmessage = require('./config/flashmessage');
const connectflash = require('connect-flash'); 

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cp());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    name: 'hospital',
    secret: 'dharmik',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 36000
    }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(connectflash());

app.use(passport.setAuth);
app.use(passport.docsetAuth);
app.use(passport.usersetAuth);

app.use(flashmessage.setflash);

app.use('/', require('./routes'));

app.listen(port, (e)=> {
    if(e){
        console.log('server is not running');
    }
    console.log('server is running on port:', port);
})
const express = require('express');

const app = express();

const path = require('path');

const port = 8003;

const db = require('./config/mongoose');

const admin = require('./models/admindata');

const cp = require('cookie-parser');

const passportlocal = require('./config/passportlocal');

const flashmessage = require('./config/flashmessage');

const connectflash = require('connect-flash');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cp());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded());

const passport = require('passport');
const session = require('express-session');

app.use(session({
    name: 'admin',
    secret: 'RNW',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 36000,
    }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuth);

app.use(connectflash());

app.use(flashmessage.setflash);

app.use('/', require('./routes'));

app.listen(port, (e)=>{
    if(e){
        console.log(e);
    }
    console.log('server is created on port: ',port);
})
const express = require('express');

const port = 8002;

const app = express();

const path = require('path');

const mongoose = require('mongoose');

mongoose.connect(
    "mongodb+srv://dharmikchhodvdiya:o317baOSOsbzkUAC@cluster0.t74c9ci.mongodb.net/admindata",
    { useNewUrlParser: true }
).then(result => {
    console.log('db is connected');
})
.catch(err => {
    console.log(err);
});

// const db = require('./config/mongoose');

const cp = require('cookie-parser');

app.use(cp());

const passportlocal = require('./config/pasportlocal');

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'user_assets')));
app.use(express.urlencoded());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const passport = require('passport');
const session = require('express-session');

const flashmessage = require('./config/flashmessage');

const connectflash = require('connect-flash');

app.use(session({
    name: 'admin',
    secret: 'RNW',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 36000,
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(connectflash());

app.use(passport.setAuth);

app.use(flashmessage.setflash);

app.use('/', require('./routes'));

app.listen(port, (e)=>{
    if(e){
        console.log('server is not runing');
    }
    console.log('server is running on port:',port);
})
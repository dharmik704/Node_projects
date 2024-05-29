const express = require('express');

const ejs = require('ejs');

const port = 8002;

const app = express();

const path = require('path');

const db = require('./config/mongoose');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/uploads',express.static(path.join(__dirname, 'uploads')));

app.use(express.static(path.join(__dirname, 'assets')));

app.use(express.urlencoded());

app.use('/', require('./routes'));

app.listen(port, (e)=>{
    if(e){
        console.log('server is not running');
    }
    console.log('server is running on port: ',port);
})
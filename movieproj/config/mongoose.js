const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/movies");

const db = mongoose.connection;

db.once('open',function(e){
    if(e){
        console.log('something went wrong');
    }
    console.log('mongodb is connected');
})

module.exports = db;
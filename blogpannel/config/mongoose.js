const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/admindata");

const db = mongoose.connection;

db.once('open', function(e){
    if(e){
        console.log(e);
    }
    console.log('db is connected');
})

module.exports = db;
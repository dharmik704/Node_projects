const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/admins");

const db = mongoose.connection;

db.once('open', function(err){
    if(err){
        console.log("somthig went wrong");
    }
    console.log('db is connected');
})

module.exports = db;
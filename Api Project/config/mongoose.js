const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/Api_Project');

const db = mongoose.connection;

db.once('open', (err) => {
    if(err){
        console.log(err);
        return false;
    }
    console.log('db is connected');
})

module.exports = db;
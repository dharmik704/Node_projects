const mongoose = require('mongoose');

const adminschema = mongoose.Schema({
    username: {
        type: 'string',
        require: true
    },
    email: {
        type: 'string',
        required: true
    },
    password: {
        type: 'string',
        required: true
    }
})

const admin = mongoose.model('admin', adminschema);

module.exports = admin;

const { name } = require('ejs');
const mongoose = require('mongoose');

const userschema = mongoose.Schema({
    name: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true
    },
    password: {
        type: 'string',
        required: true
    },
    role: {
        type: 'string',
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
})

const user = mongoose.model('user' ,userschema);

module.exports = user;
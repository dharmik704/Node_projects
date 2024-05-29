const mongoose = require('mongoose');

const reviewschema = mongoose.Schema({
    description: {
        type: 'string',
        required: true
    },
    country: {
        type: 'string',
        required: true
    },
    state: {
        type: 'string',
        required: true
    },
    username: {
        type: 'string',
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
})

const review = mongoose.model('reviews' ,reviewschema);

module.exports = review;
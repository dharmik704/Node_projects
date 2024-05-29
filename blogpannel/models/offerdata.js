const mongoose = require('mongoose');

const offerschema = mongoose.Schema({
    icon: {
        type: 'string',
        required: true
    },
    title: {
        type: 'string',
        required: true
    },
    description: {
        type: 'string',
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
})

const offer = mongoose.model('offers' ,offerschema);

module.exports = offer;
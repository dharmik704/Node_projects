const mongoose = require('mongoose');

const appointmentchema = mongoose.Schema({
    name: {
        type: 'string',
        required: true
    },
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    doctorid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctors'
    },
    email: {
        type: 'string',
        required: true
    },
    date: {
        type: 'string',
        required: true
    },
    time: {
        type: 'string',
        required: true
    },
    ustatus: {
        type: Boolean,
        required: true
    },
    dstatus: {
        type: Boolean,
        required: true
    },
    d2status: {
        type: Boolean,
        required: true
    }
})

const appointment = mongoose.model('appointment' ,appointmentchema);

module.exports = appointment;
const { name } = require('ejs');
const mongoose = require('mongoose');

const patientschema = mongoose.Schema({
    appointmentid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'appointment'
    },
    name: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true
    },
    phone: {
        type: 'number',
        required: true
    },
    gender: {
        type: 'string',
        required: true
    },
    age: {
        type: 'number',
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

const patient = mongoose.model('patient' ,patientschema);

module.exports = patient;
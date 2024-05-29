const mongoose = require('mongoose');

const specializationschema = mongoose.Schema({
    specialization: {
        type: 'string',
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
})

const specialization = mongoose.model('specialization' ,specializationschema);

module.exports = specialization;
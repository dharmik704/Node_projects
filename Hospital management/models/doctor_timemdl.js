const mongoose = require('mongoose');

const doctimeschema = mongoose.Schema({
    doctorid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctors'
    },
    time: {
        type: 'string',
        required: true
    }
})

const doctime = mongoose.model('doctortime' ,doctimeschema);

module.exports = doctime;
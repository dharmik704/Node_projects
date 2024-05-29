const mongoose = require('mongoose');

const contactschema = mongoose.Schema({
    name: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true
    },
    subject: {
        type: 'string',
        required: true
    },
    message: {
        type: 'string',
        required: true
    },
    create_date: {
        type: 'string',
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
})

const contactus = mongoose.model('contectus' ,contactschema);

module.exports = contactus;
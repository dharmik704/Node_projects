const mongoose = require('mongoose');

const employeeschema = mongoose.Schema({
    manager_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'manager',
        require: true
    },
    name: {
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
    },
    phone: {
        type: 'string',
        required: true
    },
    age: {
        type: 'number',
        required: true
    },
    gender: {
        type: 'string',
        required: true
    },
    designation: {
        type: 'string',
        required: true
    },
    salary: {
        type: 'string',
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    location: {
        type: 'string',
        required: true
    },
    created_date: {
        type: 'string',
        required: true
    },
    updated_date: {
        type: 'string',
        required: true
    },
    role: {
        type: 'string',
        required: true
    }
})

const employee = mongoose.model('employee', employeeschema);

module.exports = employee;

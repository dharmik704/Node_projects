const mongoose = require('mongoose');

const categoryschema = mongoose.Schema({
    category: {
        type: 'string',
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
})

const category = mongoose.model('category' ,categoryschema);

module.exports = category;
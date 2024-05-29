const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');
const { fileURLToPath } = require('url');

const imgpath = '/uploads/admins';

const adminschema = mongoose.Schema({
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
    hobby: {
        type: 'array',
        required: true
    },
    gender: {
        type: 'string',
        required: true
    },
    city: {
        type: 'string',
        required: true
    },
    address: {
        type: 'string',
        required: true
    },
    image: {
        type: 'string',
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    role: {
        type: 'string',
        required: true
    }
})

const imgdata = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,path.join(__dirname, '..', imgpath));
    },
    filename: (req,file,cb) => {
        cb(null,file.fieldname + '-' + Date.now());
    }
})

adminschema.statics.uploadimage = multer({storage: imgdata}).single('image');
adminschema.statics.ipath = imgpath;

const admin = mongoose.model('admins' ,adminschema);

module.exports = admin;
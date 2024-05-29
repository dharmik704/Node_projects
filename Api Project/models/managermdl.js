const mongoose = require('mongoose');

const multer = require('multer');

const imgpath = '/uploads/managerimg'

const path = require('path');

const managerschema = mongoose.Schema({
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
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
    },
    image: {
        type: 'string',
        required: true
    }
})

const imgdata = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,path.join(__dirname, '..', imgpath));
    },
    filename: (req,file,cb)=>{
        cb(null,file.fieldname + '-' + Date.now());
    }
})

managerschema.statics.uploadimage = multer({storage: imgdata}).single('image');
managerschema.statics.ipath = imgpath;

const manager = mongoose.model('manager', managerschema);

module.exports = manager;

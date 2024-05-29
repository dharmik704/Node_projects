const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const imgpath = '/uploads/doctors';

const doctorschema = mongoose.Schema({
    name: {
        type: 'string',
        required: true
    },
    specializationid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'specialization'
    },
    email: {
        type: 'string',
        required: true
    },
    password: {
        type: 'string',
        required: true
    },
    contact_no: {
        type: Number,
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
    doctorimg: {
        type: 'string',
        required: true
    },
    consultancy_fees :{
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
    },
    created_date: {
        type: 'string',
        required: true
    },
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admins'
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

doctorschema.statics.uploadimage = multer({storage: imgdata}).single('doctorimg');
doctorschema.statics.ipath = imgpath;

const doctor = mongoose.model('doctors' ,doctorschema);

module.exports = doctor;
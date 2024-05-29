const mongoose = require('mongoose');

const multer = require('multer');

const imgpath = ('/uploads/adminimg');

const path = require('path');

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
    message: {
        type: 'string',
        required: true
    },
    image: {
        type: 'string',
        required: true
    }
})

const adata = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.join(__dirname,'..',imgpath))
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname+"-"+Date.now())
    }
})

adminschema.statics.uploadimage = multer({storage: adata}).single('image');
adminschema.statics.ipath = imgpath;

const admin = mongoose.model('admin',adminschema);

module.exports = admin;
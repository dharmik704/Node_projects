const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const imgpath = '/uploads/sliders';

const sliderschema = mongoose.Schema({
    title: {
        type: 'string',
        required: true
    },
    link: {
        type: 'string',
        required: true
    },
    description: {
        type: 'string',
        required: true
    },
    sliderimage: {
        type: 'string',
        required: true
    },
    status: {
        type: Boolean,
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

sliderschema.statics.uploadimage = multer({storage: imgdata}).single('sliderimage');
sliderschema.statics.ipath = imgpath;

const slider = mongoose.model('sliders' ,sliderschema);

module.exports = slider;
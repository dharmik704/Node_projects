const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const imgpath = '/uploads/photos';

const photoschema = mongoose.Schema({
    title: {
        type: 'string',
        required: true
    },
    description: {
        type: 'string',
        required: true
    },
    photosimage: {
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

photoschema.statics.uploadimage = multer({storage: imgdata}).single('photosimage');
photoschema.statics.ipath = imgpath;

const photos = mongoose.model('photos' ,photoschema);

module.exports = photos;
const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const imgpath = '/uploads/posts';

const postschema = mongoose.Schema({
    category: {
        type: 'string',
        required: true
    },
    title: {
        type: 'string',
        required: true
    },
    description: {
        type: 'string',
        required: true
    },
    postimage: {
        type: 'string',
        required: true
    },
    username: {
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

const imgdata = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,path.join(__dirname, '..', imgpath));
    },
    filename: (req,file,cb)=>{
        cb(null,file.fieldname + '-' + Date.now());
    }
})

postschema.statics.uploadimage = multer({storage: imgdata}).single('postimage');
postschema.statics.ipath = imgpath;

const post = mongoose.model('post' ,postschema);

module.exports = post;
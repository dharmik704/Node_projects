const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const imgpath = '/uploads/subcategory';

const subcategoryschema = mongoose.Schema({
    title: {
        type: 'string',
        required: true
    },
    categoryid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    description: {
        type: 'string',
        required: true
    },
    subcategoryimage: {
        type: 'string',
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    create_date: {
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

subcategoryschema.statics.uploadimage = multer({storage: imgdata}).single('subcategoryimage');
subcategoryschema.statics.ipath = imgpath;

const subcategory = mongoose.model('subcategory' ,subcategoryschema);

module.exports = subcategory;
const mongoose = require('mongoose');

const multer = require('multer');

const imgpath = ('/uploads/moviesposters');

const path = require('path');

const movieschema = mongoose.Schema({
    title: {
        type: 'string',
        required: true
    },
    directore: {
        type: 'string',
        required: true
    },
    actores: {
        type: 'string',
        required: true
    },
    rating: {
        type: 'string',
        required: true
    },
    type: {
        type: 'array',
        required: true
    },
    language: {
        type: 'array',
        required: true
    },
    screen: {
        type: 'array',
        required: true
    },
    description: {
        type: 'string',
        required: true
    },
    date: {
        type: 'string',
        required: true
    },
    image: {
        type: 'string',
        required: true
    },
    trailer_link: {
        type: 'string',
        required: true
    },
})

const mdata = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.join(__dirname,'..',imgpath))
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname+"-"+Date.now())
    }
})

movieschema.statics.uploadimage = multer({storage: mdata}).single('image');
movieschema.statics.ipath = imgpath;

const movie = mongoose.model('movie', movieschema);

module.exports = movie;
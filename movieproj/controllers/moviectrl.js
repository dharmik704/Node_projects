const movie = require('../models/movies')

const path = require('path');

const fs = require('fs');

module.exports.showmovie = async (req,res)=>{
    let moviedata = await movie.find({}); 
    return res.render('showmovie',{
        mdata: moviedata
    });
}
module.exports.addmovie = async (req,res)=>{
    return res.render('addmovie');
}
module.exports.insertmovie = async (req,res)=>{
    var img = '';
    if(req.file){
        img = movie.ipath + '/' + req.file.filename;
    }
    req.body.image = img;
    await movie.create(req.body);
    return res.render('addmovie');
}
module.exports.showmoviedetails = async (req,res)=>{
    let moviedeta = await movie.findById(req.query.id);
    return res.render('showmoviedetails',{
        mdetail: moviedeta
    });
}
const subcategory = require('../models/subcategorydata');

const category = require('../models/categorydata');

const fs = require('fs'); 

const moment = require('moment');

module.exports.addsubcategory = async (req,res) => {
    let catdata = await category.find();
    return res.render('add_subcategory',{
        catdata
    });
}

module.exports.insertsubcategory = async (req,res) => {
    try{
        var img = '';
        if(req.file){
            img = subcategory.ipath+'/'+req.file.filename;
            req.body.subcategoryimage = img;
            req.body.status = true;
            req.body.create_date = moment().format('LLL');
            let subcategorydata = await subcategory.create(req.body);
            if(subcategorydata){
                req.flash('success', 'Data is inserted successfully');
                return res.redirect('back');
            }
            else{
                console.log('data is not inserted');
                req.flash('error', 'data is not inserted');
                return res.redirect('back');
            }
        }
        else{
            console.log('data is not inserted');
            req.flash('error', 'something went wrong');
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        req.flash('error', 'something went wrong');
        return res.redirect('back');
    }
}

module.exports.viewsubcategory = async (req,res) => {
    try{
        var search="";
        if(req.query.search){
            search = req.query.search;
        }

        var page = 0;
        var per_page = 4;
        if(req.query.page){
            page = req.query.page;
        }

        let subcategorydata = await subcategory.find({
            $or: [
                {title: {$regex: search,$options: 'i'}}
            ]
        })
        .skip(per_page*page)
        .limit(per_page)
        .populate('categoryid').exec();

        var totaldata = await subcategory.find({
            $or: [
                {title: {$regex: search,$options: 'i'}}
            ]
        }).countDocuments();
        var totalpage = Math.ceil(totaldata/per_page);
        var currentpage = page;

        if(subcategorydata){
            return res.render('view_subcategory',{
                subcategorydata,
                search,
                totalpage: totalpage,
                currentpage: currentpage
            })
        }
        else{
            console.log('data is not found');
            req.flash('error', 'data is not found');
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        req.flash('error', 'something went wrong');
        return res.redirect('back');
    }
}
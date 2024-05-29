const slider = require('../models/sliderdata');

const admin = require('../models/admindata');

const post = require('../models/postdata');

const offer = require('../models/offerdata');

const photos = require('../models/photosdata');

const review = require('../models/reviewsdata');

const comment = require('../models/commentdata');

const category = require('../models/categorydata');

const subcategory = require('../models/subcategorydata');

const contact = require('../models/contectusdata');

const moment = require('moment');

module.exports.index = async (req,res) => {
    let sdata = await slider.find({status: true});
    let odata = await offer.find({status: true});
    let pdata = await post.find({status: true}).sort({_id:-1}).limit(3);
    let photodata = await photos.find({status: true});
    let rdata = await review.find({status: true});
    let subcat = await subcategory.find({status: true}).populate('categoryid').exec();
    return res.render('Userpannel/index',{
        sdata,
        odata,
        pdata,
        photodata,
        rdata,
        subcat
    });
}

module.exports.readmore = async (req, res) => {
    try{
        let allids = await post.find({});
        // view comment
        var ids = [];
        allids.map((v,i) => {
            ids[i] = v.id;
        })
        var pos;
        ids.map((v,i) => {
            if(v==req.query.id){
                pos = i;
            }  
        })
        // end

        // find post id in comment table
        let commentdata = await comment.find({postid: req.query.id});
        

        // view last three comments

        let pdata = await post.find().sort({_id:-1}).limit(3);

        // end view last three comments

        let postdata = await post.findById(req.query.id);
        if(postdata){
            return res.render('Userpannel/readmore_post',{
                singlepostdata : postdata,
                ids,
                pos,
                commentdata,
                pdata
            })
        }
        else{
            console.log('something went wrong');
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

module.exports.addcomment = async (req,res) => {
    try{
        var img = '';
        if(req.file){
            img = comment.ipath+'/'+req.file.filename;
            req.body.commentimage = img;
            req.body.status = true;
            req.body.create_date = moment().format('LLL');
            let addcomment = await comment.create(req.body);
            if(addcomment){
                req.flash('success', 'Comment added successfully');
                return res.redirect('back');
            }
            else{
                req.flash('error', 'Something went wrong');
                return res.redirect('back');
            }
        }
    }
    catch(e){
        console.log(e);
        req.flash('error', 'something went wrong');
        return res.redirect('back');
    }
}

module.exports.workthreecolumn = async (req,res) => {
    let categorydata = await category.find();
    let subdata = await subcategory.find();
    return res.render('Userpannel/work-three-column',{
        categorydata,
        subdata
    });
}

module.exports.fourthreecolumn = async (req,res) => {
    let categorydata = await category.find();
    let subdata = await subcategory.find();
    return res.render('Userpannel/work-four-column',{
        categorydata,
        subdata
    });
}

module.exports.blog = async (req,res) => {
    let postdata = await post.find().sort({_id: -1});
    return res.render('Userpannel/blog',{
        postdata
    });
}

module.exports.about = async (req,res) => {
    let admindata = await admin.find();
    return res.render('Userpannel/about',{
        admindata
    });
}

module.exports.contact = async (req,res) => {
    return res.render('Userpannel/contect');
}

module.exports.addmessage = async (req,res) => {
    try{
        console.log(req.body);
        if(req.body){
            req.body.create_date = moment().format('LLL');
            req.body.status = true;
            let contdata = await contact.create(req.body);
            if(contdata){
                req.flash('success', 'Message is Sent Successfully');
                return res.redirect('back');
            }
            else{
                req.flash('error', 'Message not sent Please try Aggain');
                return res.redirect('back');
            }
        }
    }
    catch(err){
        console.log(err);
        req.flash('error', 'something went wrong');
        return res.redirect('back');
    }
}
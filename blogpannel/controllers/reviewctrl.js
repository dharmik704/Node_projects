const { query } = require('express');
const review = require('../models/reviewsdata');

module.exports.addreviews = async (req,res) => {
    return res.render('add_reviews');
}

module.exports.insertreviews = async (req,res) => {
    try{
        if(req.body){
            req.body.username = req.user.name;
            let reviewdata = await review.create(req.body);
            if(reviewdata){
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
            console.log(e);
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

module.exports.viewreviews = async (req,res) => {
    try{
        var search="";
        if(req.query.search){
            search = req.query.search;
        }

        var page = 0;
        var per_page = 2;
        if(req.query.page){
            page = req.query.page;
        } 

        let reviewdata = await review.find({
            $or: [
                {username: {$regex: search,$options: 'i'}},
                {country: {$regex: search,$options: 'i'}}
            ]
        })
        .skip(per_page*page)
        .limit(per_page)

        var totaldata = await review.find({
            $or: [
                {username: {$regex: search,$options: 'i'}},
                {country: {$regex: search,$options: 'i'}}
            ]
        }).countDocuments();
        var totalpage = Math.ceil(totaldata/per_page);
        var currentpage = page;

        if(reviewdata){
            return res.render('view_reviews',{
                reviewdata,
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

module.exports.deletereview = async (req,res)=>{
    try{
        let single = await review.findById(req.params.id);
        if(single){
            let del = await review.findByIdAndDelete(req.params.id);
            if(del){
                console.log('data delete');
                req.flash('success', 'Data Deleted Successfully');
                return res.redirect('back');
            }
            else{
                console.log('data is not delete');
                req.flash('error', 'Data Is Not Deleted');
                return res.redirect('back');
            }
        }
        return res.redirect('back');
    }
    catch(e){
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.updatereview = async (req,res)=>{
    try{
        let single = await review.findById(req.query.id);
        if(single){
            res.render('update_review',{
                singlereview : single
            })
        }
        else{
            console.log('data is not found');
            req.flash('error', 'Somethig Went Wrong');
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.editreviews = async (req,res)=>{
    try{
        if(req.body){
            let single = await review.findById(req.params.id);
            if(single){
                let ureview = await review.findByIdAndUpdate(req.params.id,req.body);
                if(ureview){
                    console.log('data updated');
                    req.flash('success', 'Data Updated Successfully');
                    return res.redirect('/admin/reviews/view_reviews');
                }
                else{
                    console.log('data is not updated');
                    req.flash('error', 'Data Is Not Updated');
                    return res.redirect('back');
                }
            }
            else{
                console.log('data is not updated');
                req.flash('error', 'Data Is Not Updated');
                return res.redirect('back');
            }
        }
        else{
            console.log(e);
            req.flash('error', 'Somethig Went Wrong');
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        req.flash('error', 'Somethig Went Wrong');
        return res.redirect('back');
    }
}
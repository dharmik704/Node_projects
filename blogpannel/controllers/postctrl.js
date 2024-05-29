const post = require('../models/postdata');

const path = require('path');

const fs = require('fs');

const moment = require('moment');

module.exports.addpost = async (req,res) => {
    return res.render('add_post');
}

module.exports.insertpost = async (req,res) => {
    try{
        var img = '';
        if(req.file){
            img = post.ipath+'/'+req.file.filename;
            req.body.postimage = img;
            req.body.username = req.user.name;
            req.body.create_date = moment().format('LLL');
            req.body.status = true; 
            let postdata = await post.create(req.body);
            if(postdata){
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

module.exports.viewpost = async (req,res) => {
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

        let postdata = await post.find({
            $or: [
                {username: {$regex: search,$options: 'i'}},
                {category: {$regex: search,$options: 'i'}}
            ]
        })
        .skip(per_page*page)
        .limit(per_page)

        var totaldata = await post.find({
            $or: [
                {username: {$regex: search,$options: 'i'}},
                {category: {$regex: search,$options: 'i'}}
            ]
        }).countDocuments();
        var totalpage = Math.ceil(totaldata/per_page);
        var currentpage = page;

        if(postdata){
            return res.render('view_posts',{
                postdata,
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

module.exports.deletepost = async (req,res)=>{
    try{
        let single = await post.findById(req.params.id);
        if(single){
            var imgpath = path.join(__dirname, '..' , single.postimage);
            await fs.unlinkSync(imgpath);
            let del = await post.findByIdAndDelete(req.params.id);
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

module.exports.updatepost = async (req,res)=>{
    try{
        let single = await post.findById(req.query.id);
        if(single){
            res.render('update_post',{
                singlepost : single
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

module.exports.editpost = async (req,res)=>{
    try{
        if(req.file){
            let single = await post.findById(req.params.id);
            if(single){
                var imgpath = path.join(__dirname, '..' , single.postimage);
                await fs.unlinkSync(imgpath);
                req.body.postimage = post.ipath + '/' + req.file.filename;
                let upost = await post.findByIdAndUpdate(req.params.id,req.body);
                if(upost){
                    console.log('data updated');
                    req.flash('success', 'Data Updated Successfully');
                    return res.redirect('/admin/post/view_post');
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
            let single = await post.findById(req.params.id);
            if(single){
                req.body.postimage = single.postimage;
                await post.findByIdAndUpdate(req.params.id,req.body);
            }
        }
        req.flash('success', 'Data Updated Successfully');
        return res.redirect('/admin/post/view_post');
    }
    catch(e){
        console.log(e);
        req.flash('error', 'Somethig Went Wrong');
        return res.redirect('back');
    }
}

module.exports.deactive = async (req,res) => {
    try{
        let postdata = await post.findByIdAndUpdate(req.params.id,{status: false});
        if(postdata){
            req.flash('success', 'Data is Deactivated');
            return res.redirect('back');
        }
        else{
            console.log('something went wrong');
            req.flash('error', 'Somethig Went Wrong');
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.active = async (req,res) => {
    try{
        let postdata = await post.findByIdAndUpdate(req.params.id,{status: true});
        if(postdata){
            req.flash('success', 'Data is Activated');
            return res.redirect('back');
        }
        else{
            console.log('something went wrong');
            req.flash('error', 'Somethig Went Wrong');
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.deletemultipost = async (req, res) => {
    try{
        let postdata = await post.deleteMany({_id: {$in: req.body.postids}});
        if(postdata){
            req.flash('success', 'Data Deleted Successfully');
            return res.redirect('back');
        }
        else{
            console.log('something went wrong');
            req.flash('error', 'Somethig Went Wrong');
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        return res.redirect('back');
    }
}
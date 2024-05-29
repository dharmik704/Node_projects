const photos = require('../models/photosdata');

const path = require('path');

const fs = require('fs');

module.exports.addphotos = async (req,res) => {
    return res.render('add_photos');
}

module.exports.insertphotos = async (req,res) => {
    try{
        var img = '';
        if(req.file){
            img = photos.ipath+'/'+req.file.filename;
            req.body.photosimage = img;
            let photosdata = await photos.create(req.body);
            if(photosdata){
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

module.exports.viewphotos = async (req,res) => {
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

        let photodata = await photos.find({
            $or: [
                {title: {$regex: search,$options: 'i'}}
            ]
        })
        .skip(per_page*page)
        .limit(per_page)

        var totaldata = await photos.find({
            $or: [
                {title: {$regex: search,$options: 'i'}}
            ]
        }).countDocuments();
        var totalpage = Math.ceil(totaldata/per_page);
        var currentpage = page;

        if(photodata){
            return res.render('view_photos',{
                photodata,
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

module.exports.deletephotos = async (req,res)=>{
    try{
        let single = await photos.findById(req.params.id);
        if(single){
            var imgpath = path.join(__dirname, '..' , single.photosimage);
            await fs.unlinkSync(imgpath);
            let del = await photos.findByIdAndDelete(req.params.id);
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

module.exports.updatephotos = async (req,res)=>{
    try{
        let single = await photos.findById(req.query.id);
        if(single){
            res.render('update_photo',{
                singlephoto : single
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

module.exports.editphotos = async (req,res)=>{
    try{
        if(req.file){
            let single = await photos.findById(req.params.id);
            if(single){
                var imgpath = path.join(__dirname, '..' , single.photosimage);
                await fs.unlinkSync(imgpath);
                req.body.photosimage = photos.ipath + '/' + req.file.filename;
                let uphotos = await photos.findByIdAndUpdate(req.params.id,req.body);
                if(uphotos){
                    console.log('data updated');
                    req.flash('success', 'Data Updated Successfully');
                    return res.redirect('/admin/photos/view_photos');
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
            let single = await photos.findById(req.params.id);
            if(single){
                req.body.photosimage = single.photosimage;
                await photos.findByIdAndUpdate(req.params.id,req.body);
            }
        }
        req.flash('success', 'Data Updated Successfully');
        return res.redirect('/admin/photos/view_photos');
    }
    catch(e){
        console.log(e);
        req.flash('error', 'Somethig Went Wrong');
        return res.redirect('back');
    }
}
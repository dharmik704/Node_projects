const slider = require('../models/sliderdata');

const fs = require('fs');

const path = require('path');

module.exports.addslider = async (req,res) => {
    return res.render('add_slider');
}

module.exports.insertslider = async (req,res) => {
    try{
        var img = '';
        if(req.file){
            img = slider.ipath+'/'+req.file.filename;
            req.body.sliderimage = img;
            req.body.status = true;
            let sliderdata = await slider.create(req.body);
            if(sliderdata){
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

module.exports.viewslider = async (req,res) => {
    try{
        var search = "";
        if(req.query.search){
            search = req.query.search;
        }

        var page = 0;
        var per_page = 2;
        if(req.query.page){
            page = req.query.page;
        }

        let sliderdata = await slider.find({
            $or: [
                {title: {$regex: search,$options: "i"}}
            ]
        })
        .skip(per_page*page)
        .limit(per_page)

        var totaldata = await slider.find({
            $or: [
                {title: {$regex: search,$options: "i"}}
            ]
        }).countDocuments();
        var totalpage = Math.ceil(totaldata/per_page);
        var currentpage= page;

        if(sliderdata){
            return res.render('view_slider',{
                sliderdata,
                search: search,
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

module.exports.deleteslider = async (req,res)=>{
    try{
        let single = await slider.findById(req.params.id);
        if(single){
            var imgpath = path.join(__dirname, '..' , single.sliderimage);
            await fs.unlinkSync(imgpath);
            let del = await slider.findByIdAndDelete(req.params.id);
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

module.exports.updateslider = async (req,res)=>{
    try{
        let single = await slider.findById(req.query.id);
        if(single){
            res.render('update_slider',{
                singleslider : single
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

module.exports.editslider = async (req,res)=>{
    try{
        if(req.file){
            let single = await slider.findById(req.params.id);
            if(single){
                var imgpath = path.join(__dirname, '..' , single.sliderimage);
                await fs.unlinkSync(imgpath);
                req.body.sliderimage = slider.ipath + '/' + req.file.filename;
                let uslider = await slider.findByIdAndUpdate(req.params.id,req.body);
                if(uslider){
                    console.log('data updated');
                    req.flash('success', 'Data Updated Successfully');
                    return res.redirect('/admin/slider/view_slider');
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
            let single = await slider.findById(req.params.id);
            if(single){
                req.body.sliderimage = single.sliderimage;
                await slider.findByIdAndUpdate(req.params.id,req.body);
            }
        }
        req.flash('success', 'Data Updated Successfully');
        return res.redirect('/admin/slider/view_slider');
    }
    catch(e){
        console.log(e);
        req.flash('error', 'Somethig Went Wrong');
        return res.redirect('back');
    }
}

module.exports.deactive = async (req,res) => {
    try{
        let sliderdata = await slider.findByIdAndUpdate(req.params.id, {status: false});
        if(sliderdata){
            req.flash('success', 'Data is Deactivated');
            return res.redirect('back');
        }
        else{
            req.flash('error', 'Somthing went wrong');
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
        let sliderdata = await slider.findByIdAndUpdate(req.params.id, {status: true});
        if(sliderdata){
            req.flash('success', 'Data is Activated');
            return res.redirect('back');
        }
        else{
            req.flash('error', 'Somthing went wrong');
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.deletemultislider = async (req,res) => {
    try{
        console.log(req.body);
        let deletedata = await slider.deleteMany({_id: {$in: req.body.sliderids}});
        if(deletedata){
            req.flash('success', 'Data Deleted Successfully');
            return res.redirect('back');
        }
        else{
            req.flash('error', 'Somthing went wrong');
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        return res.redirect('back');
    }
}
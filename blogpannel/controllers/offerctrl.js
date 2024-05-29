const offer = require('../models/offerdata');

module.exports.addoffer = async (req,res) => {
    return res.render('add_offers');
}

module.exports.insertoffer = async (req,res) => {
    try{
        req.body.status = true;
        let offerdata = await offer.create(req.body);
        if(offerdata){
            req.flash('success', 'Data is inserted successfully');
            return res.redirect('back');
        }
        else{
            console.log('data is not inserted');
            req.flash('error', 'data is not inserted');
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        req.flash('error', 'something went wrong');
        return res.redirect('back');
    }
}

module.exports.viewoffer = async (req,res) => {
    try{
        var search = "";
        if(req.query.search){
            search = req.query.search;
        }

        var page= 0;
        var per_page = 2;
        if(req.query.page){
            page = req.query.page;
        }

        let offerdata = await offer.find({
            $or: [
                {title: {$regex: search,$options: 'i'}}
            ]
        })
        .skip(per_page*page)
        .limit(per_page)

        var totaldata = await offer.find({
            $or: [
                {title: {$regex: search,$options: 'i'}}
            ]
        }).countDocuments();
        var totalpage = Math.ceil(totaldata/per_page);
        var currentpage = page;

        if(offerdata){
            return res.render('view_offers',{
                offerdata,
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

module.exports.deleteoffer = async (req,res)=>{
    try{
        let single = await offer.findById(req.params.id);
        if(single){
            let del = await offer.findByIdAndDelete(req.params.id);
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

module.exports.updateoffer = async (req,res)=>{
    try{
        let single = await offer.findById(req.query.id);
        if(single){
            res.render('update_offer',{
                singleoffer : single
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

module.exports.editoffer = async (req,res)=>{
    try{
        if(req.body){
            let single = await offer.findById(req.params.id);
            if(single){
                let uoffer = await offer.findByIdAndUpdate(req.params.id,req.body);
                if(uoffer){
                    console.log('data updated');
                    req.flash('success', 'Data Updated Successfully');
                    return res.redirect('/admin/offer/view_offer');
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

module.exports.deactive = async (req,res) => {
    try{
        let offerdata = await offer.findByIdAndUpdate(req.params.id, {status: false});
        if(offerdata){
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
        let offerdata = await offer.findByIdAndUpdate(req.params.id, {status: true});
        if(offerdata){
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

module.exports.deletemultioffer = async (req,res) => {
    try{
        console.log(req.body);
        let deletedata = await offer.deleteMany({_id: {$in: req.body.offerids}});
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
const specialization = require('../models/specializationmdl');

module.exports.addspecialization = async (req,res) => {
    try{
        return res.render('add_specialization');
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.insertspecialization = async (req,res) => {
    try{
        req.body.status = true;
        let addspecialization = await specialization.create(req.body);
        if(addspecialization){
            req.flash('success', 'Data is inserted successfully');
            return res.redirect('back');
        }
        else{
            req.flash('error', 'Data is not inserted');
            return res.redirect('back');
        }
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.viewspecialization = async (req,res) => {
    try{
        let spldata = await specialization.find();
        if(spldata){
            return res.render('view_specialization',{
                spldata
            });
        }
        else{
            req.flash('error', 'Data is not Found');
            return res.redirect('back');
        }
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.deletespecialization = async (req,res) => {
    try{
        let delspl = await specialization.findByIdAndDelete(req.params.id);
        if(delspl){
            req.flash('success', 'Data is deleted successfully');
            return res.redirect('back');
        }
        else{
            req.flash('error', 'Data is not deleted');
            return res.redirect('back');
        }
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.deactive = async (req,res) => {
    try{
        let spldata = await specialization.findByIdAndUpdate(req.params.id, {status: false});
        if(spldata){
            req.flash('success', 'Data is deactivated successfully');
            return res.redirect('back');
        }
        else{
            req.flash('error', 'Data is not deactivated');
            return res.redirect('back');
        }
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.active = async (req,res) => {
    try{
        let spldata = await specialization.findByIdAndUpdate(req.params.id, {status: true});
        if(spldata){
            req.flash('success', 'Data is activated successfully');
            return res.redirect('back');
        }
        else{
            req.flash('error', 'Data is not activated');
            return res.redirect('back');
        }
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

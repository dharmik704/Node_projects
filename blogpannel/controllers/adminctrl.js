const admin = require('../models/admindata');

const fs = require('fs');

const path = require('path');

const nodemailer = require('nodemailer');

module.exports.login = async (req,res)=>{
    return res.render('login');
}

module.exports.checklogin = async (req,res)=>{
    try{
        req.flash('success', 'Login Successfully');
        return res.redirect('/admin/dashboard');
    }
    catch(e){
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.dashboard = async (req,res)=>{
    return res.render('dashboard');
}

module.exports.addadmin = async (req,res)=>{
    
    return res.render('add_admin');
}

module.exports.viewadmin = async (req,res)=>{
    try{
        var search = "";
        if(req.query.search){
            search = req.query.search;
        }

        var page = 0;
        var per_page = 3;
        if(req.query.page){
            page = req.query.page;
        }

        let admindata = await admin.find({
            $or: [
                {name: {$regex: search,$options:"i"}},
                {email: {$regex: search,$options:"i"}},
                {gender: {$regex: search,$options:"i"}},
                {city: {$regex: search,$options:"i"}}
            ]
        })
        .skip(per_page*page)
        .limit(per_page)

        var totaldata = await admin.find({
            $or: [
                {name: {$regex: search,$options:"i"}},
                {email: {$regex: search,$options:"i"}},
                {gender: {$regex: search,$options:"i"}},
                {city: {$regex: search,$options:"i"}}
            ]
        }).countDocuments();
        var totalpage = Math.ceil(totaldata/per_page);
        var currentpage= page;
        
        return res.render('view_admin',{
            admdata: admindata,
            search,
            totalpage: totalpage,
            currentpage: currentpage
        });
    }
    catch(e){
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.inseradmin = async (req,res)=>{
    try{
        var img='';
        if(req.file){
            img = admin.ipath+'/'+req.file.filename;
            req.body.name = req.body.fname+' '+req.body.lname;
            req.body.image = img;
            req.body.status = true;
            console.log('data is inserted');
            await admin.create(req.body);
            req.flash('success', 'Data Inserted Successfully');
            return res.redirect('back');
        }
        else{
            console.log('data is not inserted');
            req.flash('error', 'Data Is Not Inserted');
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.deleteadmin = async (req,res)=>{
    try{
        let single = await admin.findById(req.params.id);
        if(single){
            var imgpath = path.join(__dirname, '..' , single.image);
            await fs.unlinkSync(imgpath);
            let del = await admin.findByIdAndDelete(req.params.id);
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

module.exports.updateadmin = async (req,res)=>{
    try{
        let single = await admin.findById(req.query.id);
        if(single){
            res.render('update_admin',{
                singleadmin : single
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

module.exports.editadmin = async (req,res)=>{
    try{
        if(req.file){
            let single = await admin.findById(req.params.id);
            if(single){
                var imgpath = path.join(__dirname, '..' , single.image);
                await fs.unlinkSync(imgpath);
                req.body.image = admin.ipath + '/' + req.file.filename;
                req.body.name = req.body.fname+' '+req.body.lname;
                let uadmin = await admin.findByIdAndUpdate(req.params.id,req.body);
                if(uadmin){
                    console.log('data updated');
                    req.flash('success', 'Data Updated Successfully');
                    return res.redirect('/admin/view_admin');
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
            let single = await admin.findById(req.params.id);
            if(single){
                req.body.image = single.image;
                req.body.name = req.body.fname+' '+req.body.lname;
                await admin.findByIdAndUpdate(req.params.id,req.body);
            }
        }
        req.flash('success', 'Data Updated Successfully');
        return res.redirect('/admin/view_admin');
    }
    catch(e){
        console.log(e);
        req.flash('error', 'Somethig Went Wrong');
        return res.redirect('back');
    }
}

module.exports.profile = async (req, res) => {
    try{
        return res.render('profile');
    }
    catch(e){
        console.log(e);
        req.flash('error', 'Somethig Went Wrong');
        return res.redirect('back')
    }
};

module.exports.changepassword = async (req, res) => {
    try{
        return res.render('changepassword');
    }
    catch(e){
        console.log(e);
        req.flash('error', 'Somethig Went Wrong');
        return res.redirect('back');
    }
};

module.exports.editpassword = async (req, res) => {
    try{
        if(req.body.crpass == req.user.password){
            console.log(req.user.password);
            console.log(req.body.crpass);
            console.log(req.body.newpass);
            if(req.body.newpass != req.body.crpass){
                if(req.body.newpass == req.body.cnfpass){
                    await admin.findByIdAndUpdate(req.user.id, {password: req.body.newpass});
                    req.flash('success', 'Password Is Changed Successfully');
                    return res.redirect('/admin/logout');
                }
                else{
                    console.log('confirm password and new password are not matched');
                    req.flash('error', 'confirm password and new password are not matched');
                    return res.redirect('back');
                }
            }
            else{
                console.log('current password and new password are same');
                req.flash('error', 'current password and new password are same');
                return res.redirect('back');
            }
        }
        else{
            console.log('current password is not valid');
            req.flash('error', 'current password is not valid');
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        req.flash('error', 'something went wrong');
        return res.redirect('back');
    }
};

// code for forgot password

module.exports.forgotpass = async (req, res) => {
    return res.render('forgotpass');
}

module.exports.verifyemail = async (req, res) => {
    try{
        if(req.body){
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                  // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                  user: "dharmikchhodvdiya@gmail.com",
                  pass: "wpeyeoaukdmcwhiv",
                },
            });

            const email = await admin.findOne({email: req.body.email});
            const otp = Math.round(Math.random()*1000000);
            res.cookie('otp', otp);
            res.cookie('email', req.body.email);

            const info = await transporter.sendMail({
                from: 'dharmikchhodvdiya@gmail.com', // sender address
                to: req.body.email, // list of receivers
                subject: "Email Verification ✔", // Subject line
                text: "Hello world?", // plain text body
                html: `<b>Hello Your OTP Is Here : ${otp} </b>`, // html body
            });
            
            return res.redirect('/admin/add_otp');
        }
        else{
            console.log('somthing is wrong');
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        return res.redirect('back');
    }
};

module.exports.addotp = async (req, res) => {
    try{
        return res.render('add_otp');
    }
    catch(e){
        console.log(e);
        return res.redirect('back');
    }
};

module.exports.verifyotp = async (req, res) => {
    try{
        const checkotp = req.cookies.otp;
        if(checkotp == req.body.otp){
            return res.redirect('changenewpass');
        }
        else{
            console.log('otp is not valid');
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        return res.redirect('back');
    }
};

module.exports.changenewpass = async (req, res) =>{
    try{
        return res.render('changenewpass');
    }
    catch(e){
        console.log(e);
        return res.redirect('back');
    }
};

module.exports.addnewpass = async (req, res) =>{
    try{
        if(req.body.newpass == req.body.cnfpass){
            const checkemail = await admin.findOne({email: req.cookies.email});
            if(checkemail){
                await admin.findByIdAndUpdate(checkemail.id, {
                    password: req.body.newpass,
                })
                res.clearCookie('otp');
                res.clearCookie('email');
                res.redirect('/admin/');
            }
            else{
                console.log('enter a valid email');
                return res.redirect('back');
            }
        }
        else{
            console.log('passwords are not matched');
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        return res.redirect('back');
    }
};

// end code for forgot password

module.exports.deactive = async (req,res) => {
    try{
        let admindata = await admin.findByIdAndUpdate(req.params.id, {status: false});
        if(admindata){
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
        let admindata = await admin.findByIdAndUpdate(req.params.id, {status: true});
        if(admindata){
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

module.exports.deletemultiadmin = async (req,res) => {
    try{
        console.log(req.body);
        let deletedata = await admin.deleteMany({_id: {$in: req.body.adminids}});
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
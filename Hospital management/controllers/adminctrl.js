const admin = require('../models/adminmdl');

const path = require('path');

const fs = require('fs');

const nodemailer = require('nodemailer');

module.exports.login = async (req,res) => {
    return res.render('login');
}

module.exports.checklogin = async (req,res) => {
    try{
        req.flash('success', 'Login successfully');
        return res.redirect('/admin/dashboard');
    }
    catch(err){
        req.flash('error', 'Somthing went wrong!');
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.dashboard = async (req,res) => {
    return res.render('dashboard');
}

module.exports.addadmin = async (req,res) => {
    try{
        return res.render('add_admin');
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.insertadmin = async (req,res) => {
    try{
        var img = ""
        if(req.file){
            img = admin.ipath+'/'+req.file.filename;
            req.body.image = img;
            req.body.name = req.body.firstname+' '+req.body.lastname;
            req.body.status = true;
            req.body.role = 'Admin';
            let admindata = await admin.create(req.body);
            if(admindata){
                req.flash('success', 'Data is inserted successfully');
                return res.redirect('back');
            }
            else{
                req.flash('error', 'Data is not Inserted');
                return res.redirect('back');
            }
        }
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.viewadmin = async (req,res) => {
    try{
        let admindata = await admin.find({});
        if(admindata){
            return res.render('view_admin',{
                admindata
            })
        }
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.deleteadmin = async (req,res) => {
    try{
        let admindata = await admin.findById(req.query.id);
        if(admindata){
            var imgpath = path.join(__dirname,'..',admindata.image);
            await fs.unlinkSync(imgpath);
            let deldata = await admin.findByIdAndDelete(req.query.id);
            if(deldata){
                req.flash('success', 'Data is deleted successfully');
                return res.redirect('back');
            }
            else{
                req.flash('error', 'Data is not deleted');
                return res.redirect('back');
            }
        }
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.updateadmin = async (req,res) => {
    try{
        let admindata = await admin.findById(req.query.id);
        if(admindata){
            return res.render('update_admin',{
                admindata
            })
        }
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.editadmin = async (req,res) => {
    try{
        if(req.file){
            let admindata = await admin.findById(req.params.id);
            if(admindata){
                var imgpath = path.join(__dirname,'..',admindata.image);
                await fs.unlinkSync(imgpath);
                req.body.image = admin.ipath+ '/' +req.file.filename;
                req.body.name= req.body.firstname+' '+req.body.lastname;
                let uadmin = await admin.findByIdAndUpdate(req.params.id,req.body);
                if(uadmin){
                    req.flash('success', 'Data is updated successfully');
                    return res.redirect('/admin/view_admin');
                }
                else{
                    req.flash('error', 'Data is not updated');
                    return res.redirect('back');
                }
            }
        }
        else{
            let admindata = await admin.findById(req.params.id);
            if(admindata){
                req.body.image = admindata.image;
                req.body.name= req.body.firstname+' '+req.body.lastname;
                await admin.findByIdAndUpdate(req.params.id,req.body);
            }
        }
        req.flash('success', 'Data is updated successfully');
        return res.redirect('/admin/view_admin');
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.profile = async (req,res) => {
    try{
        return res.render('profile');
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.changepassword = async (req,res) => {
    try{
        return res.render('changepassword');
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.editpassword = async (req,res) => {
    try{
        if(req.body.password == req.user.password){
            if(req.body.password != req.body.npass){
                if(req.body.npass == req.body.cpass){
                    let upass = await admin.findByIdAndUpdate(req.user.id, {password: req.body.npass});
                    if(upass){
                        return res.redirect('/admin/logout');
                    }
                    else{
                        req.flash('error', 'Password is not changed');
                        return res.redirect('back');
                    }
                }
                else{
                    req.flash('error', 'New password and confirm password are not matched');
                    return res.redirect('back');
                }
            }
            else{
                req.flash('error', 'Current password and new password are same');
                return res.redirect('back');
            }
        }
        else{
            req.flash('error', 'Current password is not valid');
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
        let admindata = await admin.findByIdAndUpdate(req.params.id, {status: false});
        if(admindata){
            req.flash('success', 'Data is deactivated');
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
        let admindata = await admin.findByIdAndUpdate(req.params.id, {status: true});
        if(admindata){
            req.flash('success', 'Data is activated');
            return res.redirect('back');
        }
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

// code of forgot password

module.exports.forgotpass = async (req,res) => {
    try{
        return res.render('forgotpassword');
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.verifyemail = async (req,res) => {
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

            if(email){
                const info = await transporter.sendMail({
                    from: 'dharmikchhodvdiya@gmail.com', // sender address
                    to: req.body.email, // list of receivers
                    subject: "Authentication for Forgot Password✔", // Subject line
                    text: "Hello world?", // plain text body
                    html: `<b>Hello Your OTP Is Here : ${otp} </b>`, // html body
                });
                
                return res.redirect('/admin/verifyotp');
            }
            else{
                console.log('Somthing is wrong');
                return res.redirect('back');
            }
        }
        else{
            console.log('Somthing is wrong');
            return res.redirect('back');
        }
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.verifyotp = async (req,res) => {
    try{
        return res.render('verifyotp');
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.checkotp = async (req,res) => {
    try{
        let otp = req.cookies.otp;
        if(otp == req.body.otp){
            return res.redirect('/admin/changepass');
        }
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.changepass = async (req,res) => {
    try{
        return res.render('forgot_changepassword');
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.editpass = async (req,res) => {
    try{
        if(req.body.npass == req.body.cpass){
            let checkemail = await admin.findOne({email: req.cookies.email});
            if(checkemail){
                await admin.findByIdAndUpdate(checkemail.id, {
                    password: req.body.npass,
                })
                res.clearCookie('otp');
                res.clearCookie('email');
                return res.redirect('/admin');
            }
            else{
                req.flash('error', 'Email is not matched');
                console.log('Email is not matched');
                return res.redirect('back');
            }
        }
        else{
            req.flash('error', 'New password and confirm password are not matched');
            console.log('New password and confirm password are not matched');
            return res.redirect('back');
        }
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

// end of code forgot password


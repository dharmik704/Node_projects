const express = require('express');

const fs = require('fs');

const admin = require('../models/admindata');
const path = require('path');

const nodemailer = require('nodemailer')

module.exports.login = async (req,res) => {
    try{
        return res.render('login');
    }
    catch(e){
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.checklogin = async (req,res) => {
    try{
        req.flash('success', 'Login Successfully');
        return res.redirect('/admin/dashboard');
    }
    catch(e){
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.dashboard = async (req, res) => {
    return res.render('dashboard');
};

module.exports.addadmin = async (req, res) => {
    return res.render('add_admin');
};

module.exports.insertadmin = async (req, res) => {
    try{
        var img = '';
        if(req.file){
            img = admin.ipath+'/'+req.file.filename;
            req.body.image = img;
            req.body.name = req.body.fname+' '+req.body.lname;
            await admin.create(req.body);
            req.flash('success', 'Data Is Successfully Inserted');
            return res.redirect('/admin/view_admin');
        }
        else{
            console.log('data is not found');
            req.flash('error', 'Data is not Found');
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        req.flash('error', 'Somthing went wrong');
        return res.redirect('back');
    }
}

module.exports.viewadmin = async (req,res) => {
    try{
        let adminview = await admin.find({});
        if(adminview){
            return res.render('view_admin',{
                admdata: adminview
            })
        }
        else{
            console.log('data is not found');
            req.flash('error', 'Data is not Found');
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        req.flash('error', 'Somthing went wrong');
        return res.redirect('back');
    }
}

module.exports.deleteadmin = async (req,res) => {
    try{
        let single = await admin.findById(req.query.id);
        if(single){
            var imgpath = path.join(__dirname, '..', single.image);
            await fs.unlinkSync(imgpath);
            await admin.findByIdAndDelete(req.query.id);
            req.flash('success', 'Data is Deleted Successfully');
            return res.redirect('back');
        }
        else{
            req.flash('error', 'Data is not found');
            console.log('data is not found')
        }
    }
    catch(e){
        console.log(e);
        req.flash('error', 'Somthing went wrong');
        return res.redirect('back');
    }
}

module.exports.updateadmin = async (req,res) => {
    try{
        let single = await admin.findById(req.query.id);
        if(single){
            return res.render('update_admin',{
                singledata : single
            });
        }
        else{
            console.log('data is not found')
        }
    }
    catch(e){
        console.log(e);
        req.flash('error', 'Somthing went wrong');
        return res.redirect('back');
    }
}

module.exports.editadmin = async (req,res) => {
    try{
        if(req.file){
            let single = await admin.findById(req.params.id);
            if(single){
                var imgpath = path.join(__dirname,'..',single.image);
                try{
                    fs.unlinkSync(imgpath);
                }
                catch(e){
                    console.log(e);
                }
                req.body.image = admin.ipath + '/' + req.file.filename;
                req.body.name = req.body.fname+' '+req.body.lname;
                await admin.findByIdAndUpdate(req.params.id,req.body);
            }
            else{
                console.log('data is not updated');
                req.flash('error', 'Data is not Updated');
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
            else{
                console.log('data is not updated');
                req.flash('error', 'Data is not Updated');
                return res.redirect('back');
            }
        }
        req.flash('success', 'Data is Updated Successfully');
        return res.redirect('/admin/view_admin');
    }
    catch(e){
        console.log(e);
        req.flash('error', 'Somthing went wrong');
        return res.redirect('back');
    }
}

module.exports.profile = async (req,res) => {
    try{
        return res.render('profile');
    }
    catch(e){
        console.log(e);
        req.flash('error', 'Somthing went wrong');
        return res.redirect('back');
    }
}

module.exports.changepassword = async (req,res) => {
    try{
        return res.render('changepassword');
    }
    catch(e){
        console.log(e);
        req.flash('error', 'Somthing went wrong');
        return res.redirect('back');
    }
}

module.exports.editpassword = async (req,res) => {
    try{
        if(req.body.pass == req.user.password){
            if(req.body.pass != req.body.npass){
                if(req.body.npass == req.body.cpass){
                    await admin.findByIdAndUpdate(req.user.id, {password: req.body.npass});
                    console.log("password is changed");
                    req.flash('success', 'Password is Changed Successfully');
                    return res.redirect('/admin/logout');
                }
                else{
                    console.log('new password and confirm password are not matched');
                    req.flash('error', 'new password and confirm password are not matched');
                    return res.redirect('back');
                }
            }
            else{
                console.log('current password and new password are both same');
                req.flash('error', 'current password and new password are both same');
                return res.redirect('back');
            }
        }
        else{
            console.log('current password is not matched');
            req.flash('error', 'current password is not matchede');
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        req.flash('error', 'Somthing went wrong');
        return res.redirect('back');
    }
}

// forgot password code

module.exports.forgotpassword = async (req,res) => {
    try{
        return res.render('forgotpass')
    }
    catch(e){
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
                    pass: "ynawfoqxvdeioybx",
                },
            });

            otp = Math.round(Math.random()*1000000);
            res.cookie('otp',otp);
            res.cookie('email',req.body.email);

            const info = await transporter.sendMail({
                from: 'dharmikchhodvdiya@gmail.gom', // sender address
                to: req.body.email, // list of receivers
                subject: "Email Varification", // Subject line
                text: "Hello world?", // plain text body
                html: `<strong>Hear Your OTP: ${otp}</strong>` // html body
            });

            return res.redirect('/admin/otp');

        }
        else{
            console.log('invalid email');
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.otp = async (req,res) => {
    try{
        return res.render('otp');
    }
    catch(e){
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.verifyotp = async (req,res) => {
    try{
        if(req.cookies.otp == req.body.otp){
            return res.redirect('newpassword');
        }
        else{
            console.log('invalid otp');
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.newpassword = async (req,res) => {
    try{
        return res.render('newpassword');
    }
    catch(e){
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.checkpass = async (req,res) => {
    try{
        if(req.body.npass == req.body.cpass){
            checkemail = await admin.findOne({email : req.cookies.email});
            if(checkemail){
                let changepass = await admin.findByIdAndUpdate(checkemail.id, {
                    password : req.body.npass,
                });
                res.clearCookie('otp');
                res.clearCookie('email');
                console.log("password changed")
                return  res.redirect('/admin');
            }
            else{
                console.log('data is not found');
                return res.redirect('back');
            }
        }
        else{
            console.log('new password and confirm password are not same');
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        return res.redirect('back');
    }
}

// end of forgot password code
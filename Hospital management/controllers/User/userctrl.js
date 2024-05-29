const doctor = require("../../models/doctormdl");

const user = require("../../models/usersmdl");

const specialization = require("../../models/specializationmdl");

const nodemailer = require('nodemailer');

const path = require('path');

const fs = require('fs');

const bcrypt = require('bcryptjs');

module.exports.login = async (req,res) => {
    try{
        return res.render('User/user_login');
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.checklogin = async (req,res) => {
    try{
        req.flash('success', 'Login successfully');
        return res.redirect('/user/dashboard');
    }
    catch(err){
        req.flash('error', 'Somthing went wrong!');
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.signup = async (req,res) => {
    try{
        return res.render('User/user_signup');
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.adduser = async (req,res) => {
    try{
        let useremail = await user.findOne({email: req.body.email})
        if(useremail){
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
            const info = await transporter.sendMail({
                from: 'dharmikchhodvdiya@gmail.com', // sender address
                to: req.body.email, // list of receivers
                subject: "Error for Sign Up✔", // Subject line
                text: "Hello world?", // plain text body
                html: `<b>Your Email is Allrady Used Please Try With Another Email for SignUp!</b>`, // html body
            });
            return res.redirect('back');
        }
        else{
            if(req.body.password == req.body.cnfpassword){
                req.body.status = true;
                req.body.role= 'User';
                let userdata = await user.create(req.body);
                if(userdata){
                    return res.redirect('/user');
                }
                else{
                    console.log('Somthing went wrong!');
                }
            }
            else{
                console.log('Password and confirm password are not matched');
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

module.exports.dashboard = async (req,res) => {
    return res.render('User/user_dashboard');
}

module.exports.profile = async (req,res) => {
    try{
        return res.render('User/user_profile');
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.updateprofile = async (req,res) => {
    try{
        let userdata = await user.findById(req.params.id);
        if(userdata){
            return res.render('User/user_updateprofile',
                {
                    userdata,
                }
            );
        }
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.editprofile = async (req,res) => {
    try{
        let userdata = await user.findById(req.params.id);
        if(userdata){
            req.body.name = req.body.firstname+' '+req.body.lastname;
            let updata = await user.findByIdAndUpdate(req.params.id,req.body);
            if(updata){
                req.flash('success', 'Profile is Updated Successfully');
                return res.redirect('/user/profile');
            }
            else{
                req.flash('error', 'Profile is not Updated, Somthing went wrong!');
                return res.redirect('back');
            }
        }
        else{
            req.flash('error', 'Data not Found, Somthing went wrong!');
            return res.redirect('back');
        }
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.changepassword = async (req,res) => {
    try{
        return res.render('User/user_changepassword');
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
                    let upass = await user.findByIdAndUpdate(req.user.id, {password: req.body.npass});
                    if(upass){
                        return res.redirect('/user/logout');
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

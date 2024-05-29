const doctor = require("../../models/doctormdl");

const specialization = require("../../models/specializationmdl");

const nodemailer = require('nodemailer');

const path = require('path');

const fs = require('fs');

module.exports.login = async (req,res) => {
    try{
        return res.render('Doctor/doctor_login')
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
        return res.redirect('/doctor/dashboard');
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}
module.exports.dashboard = async (req,res) => {
    try{
        return res.render('Doctor/doctor_dashboard');
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.profile = async (req,res) => {
    try{
        return res.render('Doctor/doctor_profile');
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.updateprofile = async (req,res) => {
    try{
        let docdata = await doctor.findById(req.params.id);
        let spldata = await specialization.find({status: true});
        if(docdata){
            return res.render('Doctor/doctor_updateprofile',
                {
                    docdata,
                    spldata
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
        let ddata = await doctor.findById(req.params.id);
        if(ddata){
            var imagepath = path.join(__dirname,'../..',ddata.doctorimg);
            await fs.unlinkSync(imagepath);
            req.body.doctorimg = doctor.ipath+'/'+req.file.filename;
            req.body.name = req.body.firstname+' '+req.body.lastname;
            let uprofile = await doctor.findByIdAndUpdate(req.params.id,req.body);
            if(uprofile){
                req.flash('success', 'Your Profile is Updated Successfully');
                return res.redirect('/doctor/profile');
            }
            else{
                req.flash('error', 'Data is not Updated!');
                return res.redirect('back');
            }
        }
        else{
            let docdata = await doctor.findById(req.params.id);
            if(docdata){
                req.body.doctorimg = docdata.doctorimg;
                req.body.name = req.body.firstname+' '+req.body.lastname;
                await doctor.findByIdAndUpdate(req.params.id,req.body);
            }
        }
        req.flash('success', 'Your Profile is Updated Successfully');
        return res.redirect('/doctor/profile');
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.changepassword = async (req,res) => {
    try{
        return res.render('Doctor/doctor_changepassword');
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
                    let upass = await doctor.findByIdAndUpdate(req.user.id, {password: req.body.npass});
                    if(upass){
                        return res.redirect('/doctor/logout');
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

// code for fogotpassword

module.exports.forgotpass = async (req,res) => {
    try{
        return res.render('Doctor/doctor_forgotpassword');
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

            const email = await doctor.findOne({email: req.body.email});
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
                
                return res.redirect('/doctor/verifyotp');
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
        return res.render('Doctor/doctor_verifyotp');
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
            return res.redirect('/doctor/changepass');
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
        return res.render('Doctor/doctor_forgot_changepassword');
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
            let checkemail = await doctor.findOne({email: req.cookies.email});
            if(checkemail){
                await doctor.findByIdAndUpdate(checkemail.id, {
                    password: req.body.npass,
                })
                res.clearCookie('otp');
                res.clearCookie('email');
                return res.redirect('/doctor');
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

// code end for forgotpassword
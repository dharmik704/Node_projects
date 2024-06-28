const doctor = require("../../models/doctormdl");

const specialization = require("../../models/specializationmdl");

const doctime = require("../../models/doctor_timemdl");

const nodemailer = require('nodemailer');

const path = require('path');

const fs = require('fs');

const { info } = require("console");

const appointment = require("../../models/appointmentmdl");

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

module.exports.add_time = async (req,res) => {
    try{
        let timedata = await doctime.find({doctorid: req.user._id});
        if(timedata.length >= 1){
            req.flash('error', 'You Can not Add More Than One Data!');
            return res.redirect('back');
        }
        else{
            return res.render('Doctor/doctor_addtime');
        }
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.savetime = async (req,res) => {
    try{
        req.body.time = req.body.day+',' + ' ' + req.body.ftime+ ' ' + 'To' + ' ' + req.body.ltime;
        req.body.doctorid = req.user.id;
        let addtime = await doctime.create(req.body);
        if(addtime){
            req.flash('success', 'Time Added Successfully');
            return res.redirect('/doctor/view_time');
        }
        else{
            req.flash('error', 'Time is Not Added! Somthing went wrong...');
            return res.redirect('back');
        }
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.view_time = async (req,res) => {
    try{
        let timedata = await doctime.find({doctorid: req.user._id});
        if(timedata){
            return res.render('Doctor/doctor_viewtime',{
                timedata
            });
        }
        else{
            req.flash('error', 'Somthing went wrong!');
            return res.redirect('back');
        }
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.updatetime = async (req,res) => {
    try{
        let timedata = await doctime.findById(req.params.id);
        if(timedata){
            return res.render('Doctor/doctor_updatetime',{
                timedata
            })
        }
        else{
            req.flash('error', 'Somthing went wrong!');
            return res.redirect('back');
        }
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.edittime = async (req,res) => {
    try{
        let timedata = await doctime.findById(req.params.id);
        if(timedata){
            req.body.time = req.body.day+',' + ' ' + req.body.ftime+ ' ' + 'To' + ' ' + req.body.ltime;
            let uptime = await doctime.findByIdAndUpdate(req.params.id,req.body);
            if(uptime){
                req.flash('success', 'Time is Updated Successfully');
                return res.redirect('/doctor/view_time');
            }
            else{
                req.flash('error', 'Time is not Updated! Somthing went wrong!');
                return res.redirect('back');
            }
        }
        else{
            req.flash('error', 'Somthing went wrong!');
            return res.redirect('back');
        }
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.viewappointment = async (req,res) => {
    try{
        let appdata = await appointment.find({doctorid: req.user.id});
        if(appdata){
            return res.render('Doctor/doctor_viewappointment',{
                appdata
            });
        }
        else{
            req.flash('error', 'Somthing went wrong!');
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
        let appdata = await appointment.findByIdAndUpdate(req.params.id, {dstatus: false}).populate('doctorid').exec();
        if(appdata){
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
            if(info){
                const info = await transporter.sendMail({
                    from: 'dharmikchhodvdiya@gmail.com', // sender address
                    to: appdata.email, // list of receivers
                    subject: `Appointment Cancellation: ${ appdata.doctorid.name } Dear ${appdata.name}`, // Subject line
                    text: "Hello world?", // plain text body
                    html: `<p> This email confirms the cancellation of your appointment on ${appdata.date} at ${appdata.time}.<br><br>
                    We apologize for any inconvenience.<br><br>
                    Sincerely,<br>
                    Dr. ${ appdata.doctorid.name }</p>`, // html body
                });
    
                req.flash('success', 'Appointment has Been Cancelled');
                return res.redirect('back');
            }
            else{
                req.flash('error', 'Appointment has not Cancelled');
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

module.exports.active = async (req,res) => {
    try{
        let appdata = await appointment.findByIdAndUpdate(req.params.id, {d2status: true}).populate('doctorid').exec();
        if(appdata){
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
            if(info){
                const info = await transporter.sendMail({
                    from: 'dharmikchhodvdiya@gmail.com', // sender address
                    to: appdata.email, // list of receivers
                    subject: `Appointment Summary: ${ appdata.doctorid.name } Dear ${appdata.name}`, // Subject line
                    text: "Hello world?", // plain text body
                    html: `<p> This email confirms your recent appointment on ${appdata.date} at ${appdata.time} is done.<br><br>
                    A detailed summary is available in your patient portal.<br><br>
                    Thank you for choosing our practice.<br><br>
                    Sincerely,<br>
                    Dr. ${ appdata.doctorid.name }</p>`, // html body
                });
    
                req.flash('success', 'Appointment has Done Successfully');
                return res.redirect('back');
            }
            else{
                req.flash('error', 'Appointment has not Done');
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

module.exports.addpatientdetail = async (req,res) => {
    try{
        let appdata = await appointment.findById(req.params.id);
        if(appdata){
            return res.render('Doctor/doctor_addpatient');
        }
        else{
            req.flash('error', 'Somthing went wrong!');
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
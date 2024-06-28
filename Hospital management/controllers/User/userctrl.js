const doctor = require("../../models/doctormdl");

const user = require("../../models/usersmdl");

const specialization = require("../../models/specializationmdl");

const doctime = require("../../models/doctor_timemdl");

const appointment = require("../../models/appointmentmdl");

const nodemailer = require('nodemailer');

const path = require('path');

const fs = require('fs');
const { info } = require("console");

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

module.exports.bookapointment = async (req,res) => {
    try{
        let spldata = await specialization.find({status: true});
        if(spldata){
            return res.render('User/user_docspecializations',
                {
                    spldata,
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

module.exports.takeappointment = async (req,res) => {
    try{
        let docdata = await doctor.findOne({specializationid: req.params.id}).populate('specializationid').exec();
        if(docdata){
            let dtime = await doctime.findOne({doctorid: docdata.id});
            return res.render('User/user_bookappointment',
                {
                    docdata,
                    dtime
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

module.exports.confirmappointment = async (req,res) => {
    try{
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
        req.body.ustatus = true;
        req.body.dstatus = true;
        req.body.d2status = false;
        req.body.name = req.user.name;
        req.body.email = req.user.email;
        req.body.userid = req.user.id;
        req.body.doctorid = req.params.id;
        var docdata = await doctor.findById(req.params.id).populate('specializationid').exec();
        if(info){
            const info = await transporter.sendMail({
                from: 'dharmikchhodvdiya@gmail.com', // sender address
                to: req.body.email, // list of receivers
                subject: `Appointment Confirmed: ${req.body.name} with Dr. ${ docdata.name }`, // Subject line
                text: "Hello world?", // plain text body
                html: `<b> See you on ${req.body.date}, ${req.body.time} at Harekrishna Hospital with ${docdata.specializationid.specialization} Dr. ${ docdata.name }. See details in portal.</b>`, // html body
            });
            const info1 = await transporter.sendMail({
                from: 'dharmikchhodvdiya@gmail.com', // sender address
                to: docdata.email, // list of receivers
                subject: `New Appointment: ${req.body.name} on ${req.body.date} Dear Dr. ${ docdata.name }`, // Subject line
                text: "Hello world?", // plain text body
                html: `<b>New appointment with ${req.body.name} on ${req.body.date} at ${req.body.time}. See details in portal.</b>`, // html body
            });
            let appdata = await appointment.create(req.body);
            if(appdata){
                req.flash('success', 'Your Appointment is Successfully Booked');
                return res.redirect('/user/viewapointment');
            }
        }
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.viewapointment = async (req,res) => {
    try{
        let appdata = await appointment.find({userid: req.user.id}).populate({
                path: "doctorid",
                model: doctor,
                populate:
                  {
                    path: "specializationid",
                    model: specialization,
                  }      
            }).exec();
        if(appdata){
            return res.render('User/user_virwappointment',
                {
                    appdata,
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

module.exports.deactive = async (req,res) => {
    try{
        let appdata = await appointment.findByIdAndUpdate(req.params.id, {ustatus: false}).populate('doctorid').exec();
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
                    to: appdata.doctorid.email, // list of receivers
                    subject: `Appointment Cancellation: ${appdata.name} Dear Dr. ${ appdata.doctorid.name }`, // Subject line
                    text: "Hello world?", // plain text body
                    html: `<p> I cancel my appointment scheduled for ${appdata.date} at ${appdata.time}.<br><br>
                    I apologize for any inconvenience this may cause.<br><br>
                    Sincerely,<br>
                    ${appdata.name}</p>`, // html body
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

// code for forgot password

module.exports.forgotpass = async (req,res) => {
    try{
        return res.render('User/user_forgotpassword');
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
                
                return res.redirect('/user/verifyotp');
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
        return res.render('User/user_verifyotp');
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
            return res.redirect('/user/changepass');
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
        return res.render('User/user_forgot_changepassword');
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
            let checkemail = await user.findOne({email: req.cookies.email});
            if(checkemail){
                await user.findByIdAndUpdate(checkemail.id, {
                    password: req.body.npass,
                })
                res.clearCookie('otp');
                res.clearCookie('email');
                return res.redirect('/user');
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

// end code for forgot password
const doctor = require('../models/doctormdl');

const specialization = require('../models/specializationmdl');

const path = require('path');

const moment = require('moment');

const nodemailer = require('nodemailer');

const fs = require('fs');

module.exports.adddoctor = async (req,res) => {
    try{
        let spldata = await specialization.find({status: true});
        if(spldata){
            return res.render('add_doctor',{
                spldata
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

module.exports.insertdoctor = async (req,res) => {
    try{
        let checkemail = await doctor.findOne({email: req.body.email});
        var img='';
        if(req.file){
            img = doctor.ipath+'/'+req.file.filename;
            req.body.doctorimg = img;
            req.body.name = req.body.firstname+' '+req.body.lastname;
            req.body.status = true;
            req.body.role='Doctor';
            req.body.password = req.body.firstname+'@'+Math.round(Math.random()*10000);
            req.body.admin_id = req.user.id;
            req.body.created_date = moment().format('LLL');

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

            var doctorlogin = `<strong>Email:</strong>` + req.body.email + `\n` + `<strong>Password:</strong>` + req.body.password;

            if(req.body.contact_no.length == 10){
                if(!checkemail){
                    const info = await transporter.sendMail({
                        from: 'dharmikchhodvdiya@gmail.com', // sender address
                        to: req.body.email, // list of receivers
                        subject: "Login Authenticate ✔", // Subject line
                        text: "Hello world?", // plain text body
                        html: `<p> Hello Dr. ${req.body.name} </p> <br/> <strong>Your email and password is hear:</strong> </br> ${doctorlogin}`, // html body
                    });
                    if(info){
                        let doctordata = await doctor.create(req.body);
                        if(doctordata){
                            req.flash('success', 'Data is inserted successfully and Mail is sent...');
                            return res.redirect('back');
                        }
                    }
                    else{
                        req.flash('error', 'Data is not inserted and mail is not sent! Somthing went wrong...');
                        return res.redirect('back');
                    }
                }
                else{
                    req.flash('error', 'Email is alrady exists please try to another email!');
                    return res.redirect('back');
                }
            }
            else{
                req.flash('error', 'Please Enter a Valid Contact Number!');
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

module.exports.viewdoctor = async (req,res) => {
    try{
        let doctordata = await doctor.find({}).populate('specializationid').exec();
        if(doctordata){
            return res.render('view_doctor',{
                doctordata
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

module.exports.deletedoctor = async (req,res) => {
    try{
        let doctordata = await doctor.findById(req.params.id);
        if(doctordata){
            let doctorimg = path.join(__dirname,'..',doctordata.doctorimg);
            await fs.unlinkSync(doctorimg);
            let deldata = await doctor.findByIdAndDelete(req.params.id);
            if(deldata){
                req.flash('success', 'Data deleted successfully');
                return res.redirect('back');
            }
            else{
                req.flash('error', 'Somthing went wrong!');
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

module.exports.showdoctor = async (req,res) => {
    try{
        let doctordata = await doctor.findById(req.params.id).populate('specializationid').exec();
        if(doctordata){
            return res.render('showdoctor',{
                ddata: doctordata
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
        let doctordata = await doctor.findByIdAndUpdate(req.params.id, {status: false});
        if(doctordata){
            req.flash('success', 'Data is Deactivated');
            return res.redirect('back');
        }
        else{
            req.flash('error', 'Data is not Deactivated Successfully');
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
        let doctordata = await doctor.findByIdAndUpdate(req.params.id, {status: true});
        if(doctordata){
            req.flash('success', 'Data is Activated Successfully');
            return res.redirect('back');
        }
        else{
            req.flash('error', 'Data is not Activated');
            return res.redirect('back');
        }
    }
    catch(e){
        req.flash('error', 'Somthing went wrong!');
        console.log(e);
        return res.redirect('back');
    }
}
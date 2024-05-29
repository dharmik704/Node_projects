const manager = require('../../../models/managermdl');
const employee = require('../../../models/employeemdl');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');

module.exports.login = async (req,res) => {
    try{
        let checkemail = await manager.findOne({email: req.body.email});
        if(checkemail){
            if(checkemail.password == req.body.password){
                let managerdata = jwt.sign({Manager:checkemail},'manager',{expiresIn:'1h'}); 
                return res.status(200).json({msg: 'Login Successfully',status:1,response:'success',ManagerData:managerdata});
            }
            else{
                return res.status(400).json({msg: 'Password is not valid',status:0,response:'error'});
            }
        }
        else{
            return res.status(400).json({msg: 'Email is not valid',status:0,response:'error'});
        }
    }
    catch(err){
        console.log(err);
        return res.status(400).json({msg: 'Somthing went wrong',status:0,response:'error'});
    }
}

module.exports.profile = async (req,res) => {
    try{
        let managerdata = await manager.find();
        if(managerdata){
            return res.status(200).json({ManagerProfile:req.user,status:1,response:'success'});
        }
        else{
            return res.status(400).json({msg: 'Data not found',status:0,response:'error'});
        }
    }
    catch(err){
        console.log(err);
        return res.status(400).json({msg: 'Somthing went wrong',status:0,response:'error'});
    }
}

module.exports.updateprofile = async (req,res) => {
    try{
        let managerdata = await manager.findById(req.params.id);
        if(managerdata){
            if(req.file){
                try{
                    let delimg = path.join(__dirname,'../../../',managerdata.image);
                    await fs.unlinkSync(delimg);
                }
                catch(err){
                    console.log(err);
                    return res.status(400).json({msg: 'Can not find image path',status:0,response:'error'});
                }
                var img = manager.ipath+'/'+req.file.filename;
                req.body.image = img;
                req.body.updated_date = moment().format('LLL');
                let updateprofile = await manager.findByIdAndUpdate(req.params.id,req.body);
                if(updateprofile){
                    return res.status(200).json({msg: 'Profile updated Successfully',status:1,response:'success'});
                }
                else{
                    return res.status(400).json({msg: 'Profile not updated!! Somthing wrong..',status:0,response:'error'});
                }
            }
            else{
                let managerdata = await manager.findById(req.params.id);
                req.body.image =  managerdata.image;
                req.body.updated_date = moment().format('LLL');
                let updateprofile = await manager.findByIdAndUpdate(req.params.id,req.body);
                if(updateprofile){
                    return res.status(200).json({msg: 'Profile updated Successfully',status:1,response:'success'});
                }
                else{
                    return res.status(400).json({msg: 'Profile not updated!! Somthing wrong..',status:0,response:'error'});
                }
            }
        }
        else{
            return res.status(400).json({msg: 'Data not found',status:0,response:'error'});
        }
    }
    catch(err){
        console.log(err);
        return res.status(400).json({msg: 'Somthing went wrong',status:0,response:'error'});
    }
}

module.exports.addemployee = async (req,res) => {
    try{
        let empdata = await employee.findOne({email: req.body.email});
        req.body.status = true;
        req.body.created_date = moment().format('LLL');
        req.body.updated_date = moment().format('LLL');
        req.body.role = 'employee';
        req.body.password = req.body.name+'@'+Math.round(Math.random()*10000);
        req.body.manager_id = req.user.id;

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

        var employeelogin = `<strong>Email:</strong>`+req.body.email+`\n`+`<strong>Password:</strong>`+req.body.password;

        if(!empdata){
            const info = await transporter.sendMail({
                from: 'dharmikchhodvdiya@gmail.com', // sender address
                to: req.body.email, // list of receivers
                subject: "Login Authenticate ✔", // Subject line
                text: "Hello world?", // plain text body
                html: `<strong>Your email and password is hear:</strong> </br> ${employeelogin}`, // html body
            });
            if(info){
                let emprecord = await employee.create(req.body);
                return res.status(200).json({msg: 'Employee Added Successfully!! Mail is sent.. ',status:1,response:'success'});
            }
            else{
                return res.status(400).json({msg: 'Mail is not send!! Somthing wrong..',status:0,response:'error'});
            }
        }
        else{
            return res.status(400).json({msg: 'Email is alrady exists!! Please try to another email..',status:0,response:'error'});
        }
    }
    catch(err){
        console.log(err);
        return res.status(400).json({msg: 'Somthing went wrong',status:0,response:'error'});
    }
}

module.exports.viewemployee = async (req,res) => {
    try{
        let empdata = await employee.find({});
        if(empdata){
            return res.status(200).json({EmployeeRecords: empdata,status:1,response:'success'});
        }
        else{
            return res.status(400).json({msg: 'Record not found',status:0,response:'error'});
        }
    }
    catch(err){
        console.log(err);
        return res.status(400).json({msg: 'Somthing went wrong',status:0,response:'error'});
    }
}

module.exports.deleteemployee = async (req,res) => {
    try{
        let empdata = await employee.findById(req.params.id);
        if(empdata){
            let deldata = await employee.findByIdAndDelete(req.params.id);
            if(deldata){
                return res.status(200).json({msg: 'Data deleted Successfully',status:1,response:'success'});
            }
            else{
                return res.status(400).json({msg: 'Data not deleted!! Somthing wrong..',status:0,response:'error'});
            }
        }
        else{
            return res.status(400).json({msg: 'Record not found',status:0,response:'error'});
        }
    }
    catch(err){
        console.log(err);
        return res.status(400).json({msg: 'Somthing went wrong',status:0,response:'error'});
    }
}
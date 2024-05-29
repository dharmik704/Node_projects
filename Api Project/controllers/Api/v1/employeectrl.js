const employee = require('../../../models/employeemdl');
const jwt = require('jsonwebtoken');
const moment = require('moment');

module.exports.login = async (req,res) => {
    try{
        let checkemail = await employee.findOne({email: req.body.email});
        if(checkemail){
            if(checkemail.password == req.body.password){
                let empdata = jwt.sign({Employee:checkemail},'employee',{expiresIn:'1h'}); 
                return res.status(200).json({msg: 'Login Successfully',status:1,response:'success',EmployeeData:empdata});
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
        let empdata = await employee.find();
        if(empdata){
            return res.status(200).json({EmployeeProfile:req.user,status:1,response:'success'});
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
        let empdata = await employee.findById(req.params.id);
        if(empdata){
            req.body.updated_date = moment().format('LLL');
            let updateprofile = await employee.findByIdAndUpdate(req.params.id,req.body);
            if(updateprofile){
                return res.status(200).json({msg: 'Profile updated Successfully',status:1,response:'success'});
            }
            else{
                return res.status(400).json({msg: 'Profile not updated!! Somthing wrong..',status:0,response:'error'});
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
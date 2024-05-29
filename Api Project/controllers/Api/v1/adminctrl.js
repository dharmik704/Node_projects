
const admin = require('../../../models/adminmdl');
const bcryptdata = require('bcrypt');
const jwt = require('jsonwebtoken');
const manager = require('../../../models/managermdl');
const employee = require('../../../models/employeemdl');
const moment = require('moment');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

module.exports.register = async (req, res) => {
    try {
        let checkemail = await admin.findOne({ email: req.body.email });
        if (!checkemail) {
            if (req.body.password == req.body.conform_password) {
                req.body.password = await bcryptdata.hash(req.body.password, 10);
                let admindata = await admin.create(req.body);
                if (admindata) {
                    return res.status(200).json({ msg: 'Registred successfully', status: 1, response: 'success', AdminData: admindata });
                }
                else {
                    return res.status(400).json({ msg: 'You are not registred!! Somthin wrong..', status: 0, response: 'error' });
                }
            }
            else {
                return res.status(400).json({ msg: 'Conform password is not matched', status: 0, response: 'error' });
            }
        }
        else {
            return res.status(400).json({ msg: 'Email is alrady exist', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.login = async (req, res) => {
    try {
        let checkemail = await admin.findOne({ email: req.body.email });
        if (checkemail) {
            let comparepass = await bcryptdata.compare(req.body.password, checkemail.password);
            if (comparepass) {
                let admidata = jwt.sign({ Admin: checkemail }, 'admin', { expiresIn: '1h' });
                return res.status(200).json({ msg: 'Login Successfully', status: 1, response: 'success', AdminData: admidata });
            }
            else {
                return res.status(400).json({ msg: 'Password is not valid', status: 0, response: 'error' });
            }
        }
        else {
            return res.status(400).json({ msg: 'Email is not valid', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.addmanager = async (req, res) => {
    try {
        var img = '';
        if (req.file) {
            img = manager.ipath + '/' + req.file.filename;
        }
        req.body.image = img;
        req.body.status = true;
        req.body.created_date = moment().format('LLL');
        req.body.updated_date = moment().format('LLL');
        req.body.role = 'manager';
        req.body.password = req.body.name + '@' + Math.round(Math.random() * 10000);
        req.body.admin_id = req.user.id;
        let managerdata = await manager.findOne({ email: req.body.email });

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

        var managerlogin = `<strong>Email:</strong>` + req.body.email + `\n` + `<strong>Password:</strong>` + req.body.password;

        if (!managerdata) {
            const info = await transporter.sendMail({
                from: 'dharmikchhodvdiya@gmail.com', // sender address
                to: req.body.email, // list of receivers
                subject: "Login Authenticate ✔", // Subject line
                text: "Hello world?", // plain text body
                html: `<strong>Your email and password is hear:</strong> </br> ${managerlogin}`, // html body
            });
            if (info) {
                let manrecord = await manager.create(req.body);
                return res.status(200).json({ msg: 'Manager Added Successfully!! Mail is sent.. ', status: 1, response: 'success' });
            }
            else {
                return res.status(400).json({ msg: 'Mail is not send!! Somthing wrong..', status: 0, response: 'error' });
            }
        }
        else {
            return res.status(400).json({ msg: 'Email is alrady exists!! Please try to another email..', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.deletemanager = async (req, res) => {
    try {
        let managerdata = await manager.findById(req.params.id);
        if (managerdata) {
            let delimg = path.join(__dirname, '../../../', managerdata.image);
            await fs.unlinkSync(delimg);
            let deldata = await manager.findByIdAndDelete(req.params.id);
            if (deldata) {
                return res.status(200).json({ msg: 'Data deleted Successfully', status: 1, response: 'success' });
            }
            else {
                return res.status(400).json({ msg: 'Data not deleted!! Somthing wrong..', status: 0, response: 'error' });
            }
        }
        else {
            return res.status(400).json({ msg: 'Record not found', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.viewmanager = async (req, res) => {
    try {
        let managerdata = await manager.find({});
        if (managerdata) {
            return res.status(200).json({ ManagerRecords: managerdata, status: 1, response: 'success' });
        }
        else {
            return res.status(400).json({ msg: 'Record not found', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.viewemployee = async (req, res) => {
    try {
        let empdata = await employee.find({});
        if (empdata) {
            return res.status(200).json({ EmployeeRecords: empdata, status: 1, response: 'success' });
        }
        else {
            return res.status(400).json({ msg: 'Record not found', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.deleteemployee = async (req, res) => {
    try {
        let empdata = await employee.findById(req.params.id);
        if (empdata) {
            let deldata = await employee.findByIdAndDelete(req.params.id);
            if (deldata) {
                return res.status(200).json({ msg: 'Data deleted Successfully', status: 1, response: 'success' });
            }
            else {
                return res.status(400).json({ msg: 'Data not deleted!! Somthing wrong..', status: 0, response: 'error' });
            }
        }
        else {
            return res.status(400).json({ msg: 'Record not found', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

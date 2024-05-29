const contact = require('../models/contectusdata');

const nodemailer = require('nodemailer');

const path = require('path');


module.exports.viewmessage = async (req,res) => {
    try{
        var search = "";
        if(req.query.search){
            search = req.query.search;
        }

        var page = 0;
        var per_page = 8;
        if(req.query.page){
            page = req.query.page;
        }

        let cntdata = await contact.find({
            $or: [
                {name: {$regex: search,$options:"i"}},
                {email: {$regex: search,$options:"i"}},
            ]
        })
        .skip(per_page*page)
        .limit(per_page)
        .sort({_id: -1});

        var totaldata = await contact.find({
            $or: [
                {name: {$regex: search,$options:"i"}},
                {email: {$regex: search,$options:"i"}},
            ]
        }).countDocuments();
        var totalpage = Math.ceil(totaldata/per_page);
        var currentpage= page;

        return res.render('view_message',{
            cntdata,
            search,
            totalpage: totalpage,
            currentpage: currentpage
        });
    }
    catch(e){
        console.log(e);
        req.flash('error', 'something went wrong');
        return res.redirect('back');
    }
}

module.exports.viewcontact = async (req,res) => {
    let cntdata = await contact.findById(req.params.id);
    return res.render('view_contectdeatails',{
        cd: cntdata 
    });
}

module.exports.sendmail = async (req,res) => {
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

        let cntdata = await contact.findById(req.params.id);
        console.log(cntdata.email);
        console.log(req.body.message);
        let message = req.body.message;

        const info = await transporter.sendMail({
            from: 'dharmikchhodvdiya@gmail.com', // sender address
            to: cntdata.email, // list of receivers
            subject: "Welcome ✔", // Subject line
            text: "Hello world?", // plain text body
            html: `<h1>Welcome:</h1>
            <p style='margine-top: 20px;'>${message}</p>`, // html body
        });
        if(cntdata.email){
            req.flash('success', 'Email is Sent Successfully');
            return res.redirect('back');
        }
        else{
            req.flash('error', 'something went wrong');
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        req.flash('error', 'something went wrong');
        return res.redirect('back');
    }
}

module.exports.deactive = async (req,res) => {
    try{
        let cntdata = await contact.findByIdAndUpdate(req.params.id,{status: false});
        if(cntdata){
            req.flash('success', 'Message is Done Successfully');
            return res.redirect('back');
        }
        else{
            req.flash('error', 'Somthing went wrong');
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        req.flash('error', 'something went wrong');
        return res.redirect('back');
    }
}

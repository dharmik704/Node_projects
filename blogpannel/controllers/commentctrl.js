const comment = require('../models/commentdata');

module.exports.viewcomment = async (req,res) => {
    try{
        let commentdata = await comment.find({}).populate('postid').exec();
        if(commentdata){
            return res.render('view_comment', {
                commentdata
            });
        }
        else{
            req.flash('error','somthing went wrong');
            return res.redirect('back');
        }
    }
    catch(e){
        req.flash('error','somthing went wrong');
        return res.redirect('back');
    }
}
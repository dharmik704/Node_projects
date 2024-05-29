const category = require('../models/categorydata');

module.exports.addcategory = async (req,res) => {
    return res.render('add_category');
}

module.exports.insertcategory = async (req,res) => {
    try{
        req.body.status = true;
        let categorydata = await category.create(req.body);
        if(categorydata){
            req.flash('success', 'Data is inserted successfully');
            return res.redirect('back');
        }
        else{
            console.log('data is not inserted');
            req.flash('error', 'data is not inserted');
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        req.flash('error', 'something went wrong');
        return res.redirect('back');
    }
}

module.exports.viewcategory = async (req,res) => {
    try{
        var search="";
        if(req.query.search){
            search = req.query.search;
        }

        var page = 0;
        var per_page = 2;
        if(req.query.page){
            page = req.query.page;
        }

        let categorydata = await category.find({
            $or: [
                {category: {$regex: search,$options: 'i'}}
            ]
        })
        .skip(per_page*page)
        .limit(per_page)

        var totaldata = await category.find({
            $or: [
                {category: {$regex: search,$options: 'i'}}
            ]
        }).countDocuments();
        var totalpage = Math.ceil(totaldata/per_page);
        var currentpage = page;

        if(categorydata){
            return res.render('view_category',{
                categorydata,
                search,
                totalpage: totalpage,
                currentpage: currentpage
            })
        }
        else{
            console.log('data is not found');
            req.flash('error', 'data is not found');
            return res.redirect('back');
        }
    }
    catch(e){
        console.log(e);
        req.flash('error', 'something went wrong');
        return res.redirect('back');
    }
}

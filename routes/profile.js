var express = require('express');
var moment = require('moment');
var _ = require('lodash');
var router = express.Router();

const validateUpdateProfileInput = require('../validation/update-profile');
 
/* GET Profile page. */
router.get('/', function (req, res, next) {
    if (req.session.login) {
        var res_data = {
            title: "Profile",
            success: req.session.success,
            user_id: req.session.user_id,
            frist_name: req.session.frist_name,
            last_name: req.session.last_name,
            user_name: req.session.user_name,
            user_email: req.session.user_email,
            user_avater: req.session.user_avater,
            cover_photo: req.session.cover_photo,
            user_phone: req.session.user_phone,
            user_type: req.session.user_type,
            gender: req.session.gender,
            company: req.session.company,
            about_me: req.session.about_me,
            nid_number: req.session.nid_number,
            home_address: req.session.home_address,
            bio: req.session.bio,
            join_date: req.session.join_date,
            moment: moment,
            _: _,
            has_login: true,
        };
        res.render("profile", res_data);
    } else {
        res.redirect('/login');
    }
});

router.post('/update', function (req, res, next) {
    const { errors, isValid } = validateUpdateProfileInput(req.body);
    if (req.session.login) {
        if(!isValid){
            var res_data = {
                title: "Profile",
                success: req.session.success,
                user_id: req.session.user_id,
                frist_name: req.session.frist_name,
                last_name: req.session.last_name,
                user_name: req.session.user_name,
                user_email: req.session.user_email,
                user_avater: req.session.user_avater,
                cover_photo: req.session.cover_photo,
                user_phone: req.session.user_phone,
                user_type: req.session.user_type,
                gender: req.session.gender,
                company: req.session.company,
                about_me: req.session.about_me,
                nid_number: req.session.nid_number,
                home_address: req.session.home_address,
                bio: req.session.bio,
                join_date: req.session.join_date,
                moment: moment,
                data: errors,
                _: _,
                has_login: true,
            };
            res.render("profile", res_data);
        }else{
            var updateData ={
                frist_name : req.body.fname,
                last_name : req.body.lname,
                name : req.body.fname + ""+ req.body.lname,
                nid_number : req.body.nid,
                home_address : req.body.address,
                about_me : req.body.about_me
            };
            User.update({ _id: req.session.user_id },updateData, function(err, result){
                if(err){
                    console.log(err);
                }else{
                    res.redirect('/profile');
                }
            });
        }
        
    } else {
        res.redirect('/login');
    }
});

module.exports = router;

var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
var moment = require('moment');
var _ = require('lodash');

// Load Input Validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

//Load user model
const User = require('../models/User');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    var data = {
      title: 'Register | Mr. Manager',
      data: errors
    }
    res.render("register", data);
  }else{
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        errors.email = 'Email already exists';
        var data = {
          title: 'Register | Mr. Manager',
          data: errors
        }
        res.render("register", data);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', // Size
          r: 'pg', // Rating
          d: 'mm' // Default
        });
        console.log(req.body.fname +" " +req.body.lname);

        const newUser = new User({
          frist_name: req.body.fname,
          last_name: req.body.lname,
          name: req.body.fname +" " +req.body.lname,
          email: req.body.email,
          phone: req.body.phone,
          type: req.body.type,
          gender: req.body.gender,
          avatar: avatar,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                var data = {
                  title: 'Register | Mr. Manager',
                  has_login: false,
                  data: user
                }
                res.render("register", data);
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }

  
});


// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  
  if (req.session.login) {
    res.redirect('/dashboard');
  } else {
    
    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
      var data = { 
        title: 'Login | Mr. Manager', 
        errors: errors 
      }
      res.render("login", data);
    }else{
      const email = req.body.email;
      const password = req.body.password;
      // Find user by email
      User.findOne({ email }).then(user => {
        // Check for user
        if (!user) {
          errors.email = 'User not found';
          var data = {
            title: 'Login | Mr. Manager',
            errors: errors
          }
          res.render("login", data);
        }

        // Check Password
        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            console.log(user);
            req.session.success = true;
            req.session.login = true;
            req.session.user_id = user._id;
            req.session.user_name = user.name;
            req.session.frist_name = user.frist_name;
            req.session.last_name = user.last_name;
            req.session.user_email = user.email;
            req.session.user_avater = user.avatar;
            req.session.cover_photo = user.cover_photo;
            req.session.user_phone = user.phone;
            req.session.user_type = user.type;
            req.session.gender = user.gender;
            req.session.bio = user.bio;
            req.session.home_address = user.home_address;
            req.session.nid_number = user.nid_number;
            req.session.about_me = user.about_me;
            req.session.company = user.company;
            req.session.join_date = user.join_date;
            res.redirect('/dashboard');
          } else {
            errors.password = 'Password incorrect';
            req.session.success = false;
            req.session.error = [{ errors }];
            var data = {
              title: 'Login | Mr. Manager',
              errors: errors
            }
            res.render("login", data);
          }
        });
      });
    }
  }
});


module.exports = router;

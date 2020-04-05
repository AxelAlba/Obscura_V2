// import json model (temporary)
var Users = require('../models/users.json');
//Importing the model (database)
const UserModel = require('../models/users');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.getProfile = function (req, res) {
  var email = 'axel@email.com'; //this is only temporary as there is still no logged in user.
  UserModel.getUser(email, function (user) {
    console.log('logged in user profile: ' + user);
    res.render('profile', {
      logUser: user
    });
  });
}

exports.settings = function (req, res) {
  var email = 'axel@email.com'; //this is only temporary as there is still no logged in user.
  UserModel.getUser(email, function (user) {
    console.log('logged in user edit profile: ' + user);
    res.render('editProfile', {
      logUser: user
    });
  });
}

exports.update = function(req, res) {
    var id = req.params.id;
    var update = {
      //uid 
      email: req.body.email,
      //password
      //username
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      profilePic: req.body.profilePic,
      bio: req.body.bio,
      mobile: req.body.mobile,
      telephone: req.body.telephone,
      address: req.body.address,
      //followers array
      //followings array
  };

  UserModel.updateUser(id, update, function(user) {
    console.log('update successful for user: ' + user);
  });
}

// LOG-IN AND REGISTRATION AUTHENTICATION PART



exports.registerUser = (req, res) => {
  // 1. Validate request

  // 2. If VALID, find if email exists in users
  //      NEW USER (no results retrieved)
  //        a. Hash password
  //        b. Create user
  //        c. Redirect to login page
  //      EXISTING USER (match retrieved)
  //        a. Redirect user to login page with error message.

  // 3. If INVALID, redirect to register page with errors
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { email, firstName, lastName, username, mobile, password } = req.body;

    userModel.getOne({ email: email }, (err, result) => {
      if (result) {
        console.log(result);
        // found a match, return to login with error
        req.flash('error_msg', 'User already exists. Please login.');
        res.redirect('/login');
      } else {
        const saltRounds = 10;

        // Hash password
        bcrypt.hash(password, saltRounds, (err, hashed) => {
          const newUser = {
            email,
            firstName,
            lastName,
            username,
            mobile,
            password: hashed
          };

          userModel.create(newUser, (err, user) => {
          if (err) {
            req.flash('error_msg', 'Could not create user. Please try again.');
            res.redirect('/signup');
            // res.status(500).send({ message: "Could not create user"});
          } else {
            console.log(user);
            req.flash('success_msg', 'You are now registered! Login below.');
            res.redirect('/login');
          }
        });
      });
    }
  });  
} else {
  const messages = errors.array().map((item) => item.msg);

  req.flash('error_msg', messages.join(' '));
  res.redirect('/signup');
  }
};

exports.loginUser = (req, res) => {
  // 1. Validate request

  // 2. If VALID, find if email exists in users
  //      EXISTING USER (match retrieved)
  //        a. Check if password matches hashed password in database
  //        b. If MATCH, save info to session and redirect to home
  //        c. If NOT equal, redirect to login page with error
  //      UNREGISTERED USER (no results retrieved)
  //        a. Redirect to login page with error message

  // 3. If INVALID, redirect to login page with errors
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const {
      email,
      password
    } = req.body;
  
    userModel.getOne({ email: email }, (err, user) => {
      if (err) {
        // Database error occurred...
        req.flash('error_msg', 'Something happened! Please try again.');
        res.redirect('/login');
      } else {
        // Successful query
        if (user) {
          // User found!
    
        // Check password with hashed value in the database
        bcrypt.compare(password, user.password, (err, result) => {
          // passwords match (result == true)
          if (result) {
            // Update session object once matched!
            req.session.user = user._id;
            req.session.name = user.name;

            console.log(req.session);

            res.redirect('/');
          } else {
            // passwords don't match
            req.flash('error_msg', 'Incorrect password. Please try again.');
            res.redirect('/login');
          }
        });  
        } else {
          // No user found
          req.flash('error_msg', 'No registered user with that email. Please register.');
          res.redirect('/register');
        }
      }
    });
  } else {
    const messages = errors.array().map((item) => item.msg);
  
    req.flash('error_msg', messages.join(' '));
    res.redirect('/login');
  }
};

exports.logoutUser = (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.redirect('/login');
    });
  }
};


//Importing the model (database)
const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

exports.getProfile = function (req, res) {
  //var email = 'axel@email.com'; //this is only temporary as there is still no logged in user.
  UserModel.getUserById(req.session.user, function (user) { //should use getUserByID if the logged in user is already implemented
    console.log('logged in user profile: ' + user);
    res.render('profile', {
      logUser: user
    });
  });
}

exports.settings = function (req, res) {
  //var email = 'axel@email.com'; //this is only temporary as there is still no logged in user.
  UserModel.getUserById(req.session.user, function (user) { //same with getProfile
    console.log('logged in user edit profile: ' + user);
    res.render('editProfile', {
      logUser: user
    });
  });
}

exports.update = function(req, res) {
   // var id = req.params.id;
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

  UserModel.updateUser(req.session.user, update, function(user) {
    console.log('update successful for user: ' + user);
  });
}

exports.search = function (req, res) {
  var search = req.query.search;
  UserModel.searchUser(search, { username: 1 }, function(userObjects) {
    res.render('search', {
      users: userObjects 
    });
  })
}

exports.getUser = function (req, res) {
  var id = req.params.id.toString();
  UserModel.getUserById(mongoose.Types.ObjectId(id), function(user) {
    res.render('otherProfile', {
      user: user
    })
  });
}

// LOG-IN AND REGISTRATION AUTHENTICATION PART
exports.registerUser = (req, res) => {
    UserModel.getOne({ $or: [ {email: req.body.email}, { username: req.body.username} ]}, (err, result) => {
      if (result) {
        console.log(result);
        // found a match, return to login with error
        req.flash('error_msg', 'User already exists. Please login.');
        res.redirect('/login');
      } else {
        const saltRounds = 10;

        // Hash password
        bcrypt.hash(req.body.password, saltRounds, (err, hashed) => {
          const newUser = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            mobile: req.body.mobile,
            password: hashed
          };

          UserModel.create(newUser, (err, user) => {
          if (err) {
            req.flash('error_msg', 'Could not create user. Please try again.');
            res.redirect('/signup');
            res.status(500).send({ message: "Could not create user"});
          } else {
            console.log(user);
            req.flash('success_msg', 'You are now registered! Login below.');
            res.redirect('/login');
          }
        });
      });
    }
  });  
};
  

exports.loginUser = (req, res) => {
    UserModel.getOne({ $or: [ {email: req.body.userinput}, { username: req.body.userinput} ] }, (err, user) => {
      if (err) {
        // Database error occurred...
        req.flash('error_msg', 'Something happened! Please try again.');
        res.redirect('/login');
      } else {
        // Successful query
        if (user) {
          // User found!
    
        // Check password with hashed value in the database
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          // passwords match (result == true)
          if (result) {
            // Update session object once matched!
            req.session.user = user._id;
            req.session.username = user.username;

            console.log(req.session);

            res.redirect('/newsfeed');
          } else {
            // passwords don't match
            req.flash('error_msg', 'Incorrect password. Please try again.');
            res.redirect('/login');
          }
        });  
        } else {
          // No user found
          req.flash('error_msg', 'No registered user with that email / username. Please register.');
          res.redirect('/signup');
        }
      }
    });
  }

exports.logoutUser = (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  }
};
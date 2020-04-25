//Importing the model (database)
const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

exports.getProfile = function (req, res) {
  res.redirect(`/profile/${req.session.user}`);
}

exports.settings = function (req, res) {
  UserModel.getUserById(req.session.user, function (user) { //same with getProfile
    console.log('logged in user edit profile: ' + user);
    res.render('editProfile', {
      logUser: user
    });
  });
}

exports.update = function(req, res) {
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
  var id = mongoose.Types.ObjectId(req.params.uid);
  var isLogUser = false;
  var isFollowed = false;

  if (id.toString() == req.session.user.toString()){
    isLogUser = true;
    console.log('Is it the session user?'+ isLogUser);
    UserModel.getUserById(id, function(user) {
      res.render('profile', {
        user: user,
        isLogUser: isLogUser,
        isFollowed: isFollowed
      })
    });
  }
  else 
  {
    var followings;
    UserModel.getUserById(req.session.user, function (user) {
      followings = user.followings;
     // console.log(followings);
      if (followings.some(following => following._id.toString() === id.toString()))
        isFollowed = true;
      else isFollowed = false;
      console.log('is followed value: ' + isFollowed);
      console.log('Is it the session user?'+ isLogUser);
      UserModel.getUserById(id, function(user) {
        res.render('profile', {
          user: user,
          isLogUser: isLogUser,
          isFollowed: isFollowed
        })
      });
    })
  }
}

// LOG-IN AND REGISTRATION AUTHENTICATION PART
exports.registerUser = (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { password } = req.body;

    UserModel.getOne({ $or: [ {email: req.body.email}, { username: req.body.username} ]}, (err, result) => {
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
} else {
  const messages = errors.array().map((item) => item.msg);
  req.flash('error_msg', messages.join(' '));
  res.redirect('/signup');
  }
};
  

exports.loginUser = (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const {
      userinput,
      password
    } = req.body;

    UserModel.getOne({ $or: [ {email: userinput}, { username: userinput} ] }, (err, user) => {
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
      res.redirect('/');
    });
  }
};


exports.follow = (req, res) => {
  var followId = req.body.userId;

    //This is for updating the followings of the logged-in user.
    UserModel.updateFollowings(req.session.user, followId, (error, sessionUserModel) => {
      console.log(error);
      console.log('(follow)This is the new followings of the logged-in user: ' + sessionUserModel.followings);
    });

    //This is for updating the followers of the user being followed.
    UserModel.updateFollowers(followId, req.session.user, (error, followedModel) => {
      console.log(error);
      console.log('(follow)This is the new followers of the user being followed: ' + followedModel.followers);
      res.send(followedModel.followers);
    });
};

exports.unfollow = (req, res) => {
  var followId = req.body.userId;

    //This is for popping an element in the followings of the logged-in user.
    UserModel.popFollowings(req.session.user, followId, (error, sessionUserModel) => {
      console.log(error);
      console.log('(unfollow)This is the new followings of the logged-in user: ' + sessionUserModel.followings);
    });

    //This is for popping an element in the followers of the user being followed.
    UserModel.popFollowers(followId, req.session.user, (error, followedModel) => {
      console.log(error);
      console.log('(unfollow)This is the new followers of the user being followed: ' + followedModel.followers);
      res.send(followedModel.followers);
    });
};

exports.followers = (req, res) => {
  id = req.params.uid;
  UserModel.getFollowers(id, function(followers){
    console.log('for follower link: '+ followers);
    res.render('search', {
      users:  followers
    });
  });
};

exports.followings = (req, res) => {
  id = req.params.uid;
  UserModel.getFollowings(id, function(followings){
    console.log('for following link: '+ followings);
    res.render('search', {
      users:  followings
    });
  });
};
// import json model (temporary)
var Users = require('../models/users.json');

//Importing the model (database)
const userModel = require('../models/users');

exports.getProfile = function (req, res) {
  res.render('profile', {
    logUser: Users[0]  //temporary data for the profile (would get the first user as the logged in user)
  });
}

exports.update = function (req, res) {
  res.render('editProfile', {
    logUser: Users[0]  //temporary data for the profile (would get the first user as the logged in user)
  });
}

exports.updateProfile = function(req, res) {//(NOT YET FINISH) (should be implemented in mongoose)
    // TODO
    var profile = {
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
     //save to the database
     //send it back to the client, to know that it is successful
    res.status(200).send(student); 
  }


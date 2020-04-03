// import json model (temporary)
var Users = require('../models/users.json');
//Importing the model (database)
const UserModel = require('../models/users');

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




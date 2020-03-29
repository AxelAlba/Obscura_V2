// import json model (temporary)
var Users = require('../models/users.json');
//Importing the model (database)
const userModel = require('../models/users');

const router = require('express').Router();
 
router.get('/', function (req, res) {
    res.render('profile' , {
        logUser : Users[0]  //temporary data for the profile (would get the first user as the logged in user)
      });
});

module.exports = router;
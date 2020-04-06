const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    email: {type: String, required: [true, "No email provided"]},
    password: {type: String, required: [true, "No password provided"]},
    username: {type: String, required: [true, "No userName provided"]},
    firstName: {type: String, required: [true, "No firstName provided"]},
    lastName: {type: String, required: [true, "No lastName provided"]},
    profilePic: {type: String},
    bio: {type: String},
    mobile: {type: String, required: [true, "No mobile number provided"]},
    telephone: {type: String},
    address: {type: String},
    followers: [{
         type: Schema.Types.ObjectId, 
         ref: 'users', 
         required: [true, 'no user id provided for followers user'],      
    }],
    followings: [{
        type: Schema.Types.ObjectId, 
        ref: 'users', 
        required: [true, 'no user id provided for following user'],      
    }]
  }
);

const UserModel = mongoose.model('users', UserSchema);

exports.getUserByEmail = function (email, next) {
  UserModel.find({email: email}, (err, result) => {
    if (err) throw err;
    result.forEach((doc) => {
        next(doc.toObject());
    });
  });
}

exports.updateUser = function (id, update, next){
  UserModel.findByIdAndUpdate({_id: id}, update, function() {
    UserModel.findOne({_id: id}, function(user) {
      next(user);
    });
  });
}

exports.searchUser = function (search, sort, next){
  UserModel.find({username: {$regex: search}}).sort(sort).exec(function(err, result){ 
    if (err) throw err;
    var userObjects = [];
    result.forEach(function(doc) {
      userObjects.push(doc.toObject());
    });
    next(userObjects);
  });
}

exports.getUserById = function (id, next) {
  UserModel.findById(id, (err, user) => {
    if (err) throw err;
    next(user.toObject());
  });
}
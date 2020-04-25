const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    email: {type: String, required: [true, "No email provided"]},
    password: {type: String, min: 6, required: [true, "No password provided"]},
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

// Retrieving just ONE user based on a query (first one)
exports.getOne = function(query, next) {
  UserModel.findOne(query, function(err, user) {
    next(err, user);
  });
};

// Saving a user given the validated object
exports.create = function(obj, next) {
  const user = new UserModel(obj);

  user.save(function(err, user) {
    next(err, user);
  });
};


exports.updateFollowings = function (logUser, followId, next) {
  UserModel.findByIdAndUpdate(logUser, {$push: {'followings': followId}}, {safe: true, upsert: true, new: true}, (err, model)  => {
    next(err, model);
  });
};

exports.updateFollowers = function (followId, logUser, next) {
  UserModel.findByIdAndUpdate(followId, {$push: {'followers': logUser}}, {safe: true, upsert: true, new: true}, (err, model)  => {
    next(err, model);
  });
};

exports.popFollowings = function (logUser, followId, next) {
  UserModel.findByIdAndUpdate(logUser, {$pull: {'followings': followId}}, {new: true}, (err, model)  => {
    next(err, model);
  });
};

exports.popFollowers = function (followId, logUser, next) {
  UserModel.findByIdAndUpdate(followId, {$pull: {'followers': logUser}}, {new: true}, (err, model)  => {
    next(err, model);
  });
};

exports.getFollowings = function (id, next){
  UserModel.findById(id).populate("followings").lean().exec(function(err, user){
    if (err) throw err;
    next(user.followings);
  });
};

exports.getFollowers = function (id, next){
  UserModel.findById(id).populate("followers").lean().exec(function(err, user){
    if (err) throw err;
    next(user.followers);
  });
};



const mongoose = require('./connection');
const Schema = mongoose.Schema;
// LOG-IN AND REGISTRATION AUTHENTICATION PART
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
    }],
    date: { type: Date, default: Date.now }
  }
);

const User = mongoose.model('users', UserSchema);

// Saving a user given the validated object
exports.create = function(obj, next) {
  const user = new User(obj);

  user.save(function(err, user) {
    next(err, user);
  });
};

// Retrieving a user based on ID
exports.getById = function(id, next) {
  User.findById(id, function(err, user) {
    next(err, user);
  });
};

// Retrieving just ONE user based on a query (first one)
exports.getOne = function(query, next) {
  User.findOne(query, function(err, user) {
    next(err, user);
  });
};
// END OF USER CREATION PART

/*
  Note:
    Only the functions of this model should be exported, not the actual model. All the database related methods should
    only be in the models.

  example: 
  exports.query = function(pattern, sort, next) {
    studentModel.find({ name: { $regex: pattern } }).sort(sort).exec( function(err, students){
        next(students); // next() == *function callback at the controller*
    });
  };
*/
const UserModel = mongoose.model('users', UserSchema);

//module.exports = mongoose.model('users', UserSchema); //this should not be exported

exports.getUser = function (email, next) {
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
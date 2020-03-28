const mongoose = require('mongoose');

const databaseURL = 'mongodb+srv://axel:axel123@obscuracluster-2swgt.mongodb.net/test?retryWrites=true&w=majority'; 

const options = { useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false };

mongoose.connect(databaseURL, options);

const userSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, required: [true, "no user id provided"]},
    email: {type: String, required: [true, "No email provided"]},
    password: {type: String, required: [true, "No password provided"]},
    userName: {type: String, required: [true, "No userName provided"]},
    firstName: {type: String, required: [true, "No firstName provided"]},
    lastName: {type: String, required: [true, "No lastName provided"]},
    profilePic: {type: String},
    bio: {type: String},
    mobile: {type: String, required: [true, "No mobile number provided"]},
    telephone: {type: String},
    address: {type: String},
    followers: [{
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'users', 
         required: [true, 'no user id provided for followers user'],      
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users', 
        required: [true, 'no user id provided for following user'],      
   }]
  }
);

module.exports = mongoose.model('users', userSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const databaseURL = 'mongodb+srv://axel:axel123@obscuracluster-2swgt.mongodb.net/obscura?retryWrites=true&w=majority'; 
const options = { useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false };

mongoose.connect(databaseURL, options);

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


/* 2 EXAMPLES OF QUERY */

//1.) The first query can handle complex queries. However, this kind of query always returns an array of documents (Convert to object)
UserModel.find({email: 'axel@email.com'}).exec((err, result) => {
    if (err) throw err; //needed

    result.forEach(function(doc) { //for each and toObject is require for .exec
        console.log(doc.toObject());
      });
});


//2.) The second query is for simple queries. It returns either a single object or an array of objects.
UserModel.find({email: 'axel@email.com'}, (err, result) => {
    if (err) throw err;
    result.forEach((doc) => {
        console.log(doc.toObject());
    });
});


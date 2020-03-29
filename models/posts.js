const mongoose = require('mongoose');

const databaseURL = 'mongodb+srv://axel:axel123@obscuracluster-2swgt.mongodb.net/test?retryWrites=true&w=majority'; 
const options = { useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false };

mongoose.connect(databaseURL, options);

const postSchema = new mongoose.Schema({
    author_id: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: [true, "no author id provided"]}, 
    author: {type: String, required: [true, "No author name provided"]},
    img: {type: String, required: [true,"No img link provided"] },
    caption: {type: String, required: [true, "No caption provided"]},
    title: {type: String, required: [true, "No author provided"]},
    likes: {type: Number, default: 0, min: 0},
    comments: [{
        commentor_id: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: [true, "no commentor id provided"]},
        commentor: {type: String, required: [true, "No commentor name provided"]},
        comment: {type: String, required: [true, "No comment provided"]}
    }]
  }

);

module.exports = mongoose.model('posts', postSchema);

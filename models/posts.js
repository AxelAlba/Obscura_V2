const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema(
  {
    author: {type: Schema.Types.ObjectId, ref: 'users', required: [true, "no author id provided"]}, 
    img: {type: String, required: [true,"No img link provided"] },
    caption: {type: String, required: [true, "No caption provided"]},
    title: {type: String, required: [true, "No author provided"]},
    likes: {type: Number, default: 0, min: 0},
    comments: [{
        commenter: {type: Schema.Types.ObjectId, ref: 'users', required: [true, "no commenter id provided"]},
        comment: {type: String, required: [true, "No comment provided"]}
    }]
  }
);




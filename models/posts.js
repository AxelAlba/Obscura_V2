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
//module.exports = mongoose.model('Post', PostSchema);


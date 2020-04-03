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

const PostModel = mongoose.model('Post', PostSchema);

// Get all Posts
exports.getDiscoverPosts = function (next) {
  PostModel.find({}, 'img') // Add filter for not followed
    .exec((err, data) => {
      if (err) throw err;

      var posts = [];
      data.forEach((post) => {
        posts.push(post.toObject());
      });

      next(posts);
    });
};

exports.getPostById = function (id, next) {
  PostModel.findById(id)
    .populate('author')
    .populate({
      path: 'comments.commenter',
      model: 'users'
    })
    .exec((err, post) => {
      if (err) throw err;
      next(post.toObject());
    });
};



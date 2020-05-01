//Importing the model (database)
const PostModel = require('../models/PostModel');

// route handlers (CRUD)
// returns post view
exports.getPost = function(req, res) {
  PostModel.getPostById(req.params.pid, function(post) {
    res.render('post', {post: post});
  });
}

// returns all posts
exports.getDiscoverPosts = function (req, res) {
  PostModel.getDiscoverPosts(function(posts) {
    res.send(posts);
  })
}

// creates comment
exports.createComment = function (req, res) {
  PostModel.createComment(req.params.pid, req.session.user, req.body.comment, function (comment) {
    res.send(comment);
  });
}

exports.createPost = function (req, res) {
  let post = {
    author: req.session.user,
    img: req.file.filename,
    title: req.body.title,
    caption: req.body.caption
  }

  PostModel.createPost(post, function(post) {
    res.send(post);
  })
}

exports.deletePost = function (req, res) {
  PostModel.deletePost(req.params.pid, function(message) {
    res.send(message);
  })
}


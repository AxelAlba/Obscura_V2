//Importing the model (database)
const PostModel = require('../models/PostModel');
const UserModel = require('../models/UserModel');
const mongoose = require('mongoose');

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
  });
}

exports.getProfilePosts = function (req, res) {
  var id = req.query.user;
  console.log("current profile viewing is " + id);
  PostModel.getProfilePosts(id, function(posts) {
    console.log("current profile viewing is " + id);
    res.send(posts);
  });
}

// returns followings' posts
exports.getFollowingPosts = function (req, res) {
  id = req.session.user;
  UserModel.getFollowingsId(id, function(followings){
    console.log(followings);
    PostModel.getProfilePosts(followings, function(posts) {
      res.send(posts);
    });
  });

} 

// creates comment
exports.createComment = function (req, res) {
  PostModel.createComment(req.params.pid, req.session.user, req.body.comment, function (comment) {
    res.send(comment);
  });
}

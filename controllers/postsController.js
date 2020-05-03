//Importing the model (database)
const PostModel = require('../models/PostModel');
const UserModel = require('../models/UserModel');
const mongoose = require('mongoose');

// route handlers (CRUD)
// returns post view
exports.getPost = function(req, res) {
  PostModel.getPostById(req.params.pid, function(post) {
    var postOwner = false;
    // if session user owns the post
    if (post.author._id == req.session.user) {
      postOwner = true;
    }
    res.render('post', { post: post, postOwner: postOwner});
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

exports.heart = (req, res) => {
  var postId = req.body.postId;
  var hearts = req.body.hearts;
    //This is for updating the followers of the user being followed.
    PostModel.updateLikes(postId, hearts, (error, postModel) => {
      console.log(error);
      console.log('New likes of this post: ' + postModel.likes);
      res.send(postModel);
    });
};


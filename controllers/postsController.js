// import json model (temporary)
Posts = require('../models/posts.json');

//Importing the model (database)
const PostModel = require('../models/posts');

// route handlers (CRUD)
exports.getPost = function(req, res) {
  PostModel.getPostById(req.params.pid, function(post) {
    res.render('post', {post: post});
  });
}

exports.getDiscoverPosts = function (req, res) {
  PostModel.getDiscoverPosts(function(posts) {
    res.send(posts);
  })
  //res.send(Posts);
}

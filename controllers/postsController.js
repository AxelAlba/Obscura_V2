// import json model (temporary)
posts = require('../models/posts.json');

//Importing the model (database)
const postModel = require('../models/posts');

// route handlers (CRUD)
exports.viewPost = function(req, res) {
  let post = posts.filter(post => post.pid == req.params.pid)[0];
  res.send(post);
}

exports.getPosts = function (req, res) {
  res.send(posts);
}

exports.getGallery = function (req, res) {
  res.status(200).send(posts);
}

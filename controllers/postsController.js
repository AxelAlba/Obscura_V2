// import json model (temporary)
Posts = require('../models/posts.json');

//Importing the model (database)
const postModel = require('../models/posts');

// route handlers (CRUD)
exports.viewPost = function(req, res) {
  let post = Posts.filter(post => post.pid == req.params.pid)[0];
  console.log(post);
  res.send(post);
}

exports.getPosts = function (req, res) {
  res.send(Posts);
}

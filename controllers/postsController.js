// import model
Posts = require('../models/posts.json');

// route handlers (CRUD)
exports.viewPost = function(req, res) {
  let post = Posts.filter(post => post.pid == req.params.pid)[0];
  res.send(post);
}

exports.getPosts = function (req, res) {
  res.send(Posts);
}

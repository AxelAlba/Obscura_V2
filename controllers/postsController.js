//Importing the model (database)
const PostModel = require('../models/posts');

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
  PostModel.createComment(req.params.pid, req.body.commenter, req.body.comment, function (comment) {
    res.send(comment);
  });
}

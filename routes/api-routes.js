const router = require('express').Router();

// import controllers here...
const postsController = require('../controllers/postsController.js');

// routes and route handlers (controllers)
router.get('/getPosts', postsController.getPosts);       // get all posts
router.get('/viewPost/:pid', postsController.viewPost);  // get single post
// export
module.exports = router;
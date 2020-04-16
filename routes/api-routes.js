const router = require('express').Router();

// import controllers here...
const postsController = require('../controllers/postsController.js');
const usersController = require('../controllers/usersController.js');

// routes and route handlers (controllers)
//for the posts
router.get('/getDiscoverPosts', postsController.getDiscoverPosts);        // get all posts
router.post('/post/:pid/comment/create', postsController.createComment);  // create comment on post

//for the users
router.put('/updateProfile/:id', usersController.update); // update user profile
router.get('/searchUser', usersController.search); // search users

module.exports = router;
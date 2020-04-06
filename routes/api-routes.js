const router = require('express').Router();

// import controllers here...
const postsController = require('../controllers/postsController.js');
const usersController = require('../controllers/usersController.js');

// routes and route handlers (controllers)

//for the posts
router.get('/getDiscoverPosts', postsController.getDiscoverPosts);       // get all posts
router.get('/post/:pid', postsController.getPost);  // get single post
router.post('/post/:pid/comment/create', postsController.createComment);

//for the users
router.put('/updateProfile/:id', usersController.update); 
router.get('/searchUser', usersController.search);

module.exports = router;
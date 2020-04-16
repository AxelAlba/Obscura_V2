const router = require('express').Router();

// import controllers here...
const postsController = require('../controllers/postsController.js');
const usersController = require('../controllers/usersController.js');
const { isPrivate } = require('../middlewares/checkAuth');
// const { registerValidation } = require('../validators.js');

// routes and route handlers (controllers)

//for the posts
router.get('/getPosts', isPrivate, postsController.getPosts);       // get all posts
router.get('/viewPost/:pid', isPrivate, postsController.viewPost);  // get single post

//for the users
router.put('/updateProfile/:id', isPrivate, usersController.update); 

// POST methods for form submissions
// router.post('/signup', usersController.loginUser);
// router.post('/login', usersController.loginUser);

module.exports = router;
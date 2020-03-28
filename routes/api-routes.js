const router = require('express').Router();

// import controllers here...
const postsController = require('../controllers/postsController.js');
const usersController = require('../controllers/usersController.js');

// routes and route handlers (controllers)

//for the posts
router.get('/getPosts', postsController.getPosts);       // get all posts
router.get('/viewPost/:pid', postsController.viewPost);  // get single post
router.get('/getGallery', postsController.getGallery);

//for the users
router.get('/profile' , usersController.getProfile);

router.put('/updateProfile/:uid', usersController.updateProfile);


module.exports = router;
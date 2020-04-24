const router = require('express').Router();

// import controllers here...
const postsController = require('../controllers/postsController.js');
const usersController = require('../controllers/usersController.js');
const { isPrivate } = require('../middlewares/checkAuth');

// routes and route handlers (controllers)
//for the posts
router.get('/getDiscoverPosts', isPrivate, postsController.getDiscoverPosts);        // get all posts
router.post('/post/:pid/comment/create', isPrivate, postsController.createComment);  // create comment on post

//for the users
router.put('/updateProfile', isPrivate, usersController.update); // update user profile
router.get('/searchUser', isPrivate, usersController.search); // search users

//for following and followers link
router.get('/followers/:uid', isPrivate, usersController.followers);
router.get('/followings/:uid', isPrivate, usersController.followings);


module.exports = router;
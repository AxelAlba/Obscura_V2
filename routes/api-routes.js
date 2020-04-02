const router = require('express').Router();

// import controllers here...
const postsController = require('../controllers/postsController.js');
const usersController = require('../controllers/usersController.js');

// routes and route handlers (controllers)

//for the posts
router.get('/getPosts', postsController.getPosts);       // get all posts
router.get('/viewPost/:pid', postsController.viewPost);  // get single post
router.get('/test', function(req,res) {
  res.render('test', {
    img: 'https://i.imgur.com/0DbchzM.jpg'
  });
});

//for the users
router.put('/updateProfile/:id', usersController.update); 


module.exports = router;
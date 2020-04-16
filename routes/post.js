const router = require('express').Router();
const postsController = require('../controllers/postsController');

router.get('/:pid', postsController.getPost);  // get single post

module.exports = router;

const router = require('express').Router();
const postsController = require('../controllers/postsController');
const { isPrivate } = require('../middlewares/checkAuth');
router.get('/:pid', isPrivate, postsController.getPost);  // get single post
module.exports = router;

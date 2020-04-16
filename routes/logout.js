const router = require('express').Router();
const usersController = require('../controllers/usersController');
const { isPrivate } = require('../middlewares/checkAuth');

// logout user
router.get('/', isPrivate, usersController.logoutUser);

module.exports = router;
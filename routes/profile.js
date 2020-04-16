const router = require('express').Router();
const userController = require('../controllers/usersController');
const { isPrivate } = require('../middlewares/checkAuth');
 
router.get('/',  isPrivate, userController.getProfile); // read profile
router.get('/settings', isPrivate, userController.settings); // settings page

module.exports = router;
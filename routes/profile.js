const router = require('express').Router();
const userController = require('../controllers/usersController');
 
router.get('/', userController.getProfile); // read profile
router.get('/settings', userController.settings); // settings page

module.exports = router;
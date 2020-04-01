const router = require('express').Router();
const userController = require('../controllers/usersController');
 
router.get('/', userController.getProfile); // read profile
router.get('/edit', userController.updatePage); // update profile

module.exports = router;
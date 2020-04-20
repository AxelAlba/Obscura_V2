const router = require('express').Router();
const usersController = require('../controllers/usersController');
const { isPublic } = require('../middlewares/checkAuth');
const { registerValidation } = require('../validators.js');

router.get('/', isPublic, function (req, res) {
  res.render('signup');
});

router.post('/', isPublic, registerValidation, usersController.registerUser);

module.exports = router;
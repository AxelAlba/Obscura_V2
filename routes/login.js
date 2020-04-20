const router = require('express').Router();
const usersController = require('../controllers/usersController');
const { isPublic } = require('../middlewares/checkAuth');
const { loginValidation } = require('../validators.js');

router.get('/', isPublic, function (req, res) {
  res.render('login');
});

router.post('/', isPublic, loginValidation, usersController.loginUser);

module.exports = router;
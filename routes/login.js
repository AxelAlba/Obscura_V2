const router = require('express').Router();
const usersController = require('../controllers/usersController');
const { isPublic } = require('../middlewares/checkAuth');

router.get('/', isPublic, function (req, res) {
  res.render('login');
});

router.post('/', isPublic, usersController.loginUser);

module.exports = router;
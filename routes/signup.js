const router = require('express').Router();
const usersController = require('../controllers/usersController');
const { isPublic } = require('../middlewares/checkAuth');

router.get('/', isPublic, function (req, res) {
  res.render('signup');
});

router.post('/', isPublic, usersController.registerUser);

module.exports = router;
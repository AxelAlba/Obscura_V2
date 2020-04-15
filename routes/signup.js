const router = require('express').Router();
const usersController = require('../controllers/usersController.js');

router.get('/', function (req, res) {
  res.render('signup');
});

module.exports = router;

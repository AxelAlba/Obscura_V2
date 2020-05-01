const router = require('express').Router();
const { isPrivate } = require('../middlewares/checkAuth');

router.get('/', isPrivate, function(req, res) {
  res.render('newsfeed', {mode: "discover"});
});

module.exports = router;
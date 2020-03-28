const router = require('express').Router();

router.get('/', function(req, res) {
  res.render('newsfeed');
});


module.exports = router;

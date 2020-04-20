const router = require('express').Router();

const { isPublic } = require('../middlewares/checkAuth');

router.get('/', isPublic, function(req, res) {
  res.render('landing');
});

module.exports = router;


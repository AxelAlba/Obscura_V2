const router = require('express').Router();
const { isPrivate } = require('../middlewares/checkAuth');
 
router.get('/:pid', isPrivate, function (req, res) {
  res.render('post', {
    pid: req.params.pid  
  });
});

module.exports = router;

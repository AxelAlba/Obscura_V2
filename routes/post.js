const router = require('express').Router();
 
router.get('/:pid', function (req, res) {
  res.render('post', {
    pid: req.params.pid  
  });
});

module.exports = router;

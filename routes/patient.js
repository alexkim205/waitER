var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:clientId', function(req, res, next) {
  res.render('patient', { title: 'waitER', id: req.params['clientId'] });
});

module.exports = router;

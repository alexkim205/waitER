var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/id/:clientId', function(req, res, next) {
  res.render('index', { title: 'PennApps', id: req.params['clientId'] });
});

module.exports = router;

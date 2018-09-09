var express = require('express');
var router = express.Router();

/* GET triage page. */
router.get('/', function(req, res, next) {
  res.render('triage', { title: 'Triage Patient' });
});

module.exports = router;

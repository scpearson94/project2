var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('signup.html', { root: './public/forms' });
});

module.exports = router;

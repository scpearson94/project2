var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Expense Tracking by SCP', heading: 'Expense Tracker' });
});

module.exports = router;

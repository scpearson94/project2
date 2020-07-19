var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* POST home page. */
router.post('/', urlencodedParser, function(req, res) {
  const first_name = req.body.first_name;
  const homeHeader = "Welcome, " + first_name + ", to Expense Tracking by SCP";
  res.render('pages/home', { heading: homeHeader });
});

router.get('/', function(req, res) {
  const homeHeader = "Welcome to Expense Tracking by SCP";
  res.render('pages/home', { heading: homeHeader });
});

module.exports = router;

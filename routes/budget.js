var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* POST home page. */
router.post('/', urlencodedParser, function(req, res) {
  const first_name = req.body.first_name;
  res.render('pages/budget', { heading: "Budget Review" });
});

router.get('/', function(req, res) {
  res.render('pages/budget', { heading: "Budget Review" });
});

module.exports = router;

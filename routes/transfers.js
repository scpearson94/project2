var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* POST home page. */
router.post('/', urlencodedParser, function(req, res) {
  const first_name = req.body.first_name;
  res.render('pages/transfers', { heading: "Transfers" });
});

router.get('/', function(req, res) {
  res.render('pages/transfers', { heading: "Transfers" });
});

module.exports = router;

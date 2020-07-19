var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var bodyParser = require('body-parser');
const { response } = require('express');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* POST expense page. */
router.post('/', urlencodedParser, function(req, res) {
  const amount = req.body.amount;
  const description = req.body.description;
  const sql = "INSERT INTO expense (user_id, account_id, category_id, amount, transaction_date, description) VALUES (1, 1, 1, " + amount + ", '2020-07-17', '" + description + "')";

  pool.query(sql, function(err, result) {
      // If an error occurred...
      if (err) {
          let params = { displayReq: "Error", err: err };
          console.log("Error in query.")
          res.render('pages/error', params);
      } else {
          //let rsList = [];
          //(result.rows).forEach(rslt => { rsList.push(rslt['type']); });
          const params = { heading: "Expense added" };
          // Log this to the console for debugging purposes.
          console.log("Expense successfully added.");
          res.render('pages/expenses', params);
      }
  });
});

router.get('/', function(req, res) {
  res.render('pages/expenses', { heading: "Expenses" });
});

module.exports = router;

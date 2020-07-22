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

/* POST transfers page. */
router.post('/', urlencodedParser, function(req, res) {
  const amount = req.body.amount;
  const from_account = req.body.from_account;
  const to_account = req.body.to_account;
  const description = req.body.description;
  const sql = "INSERT INTO transfer (user_id, from_account_id, to_account_id, amount, transfer_date, description) VALUES (1, 1, 2, " + amount + ", '2020-07-21', '" + description + "')";

  pool.query(sql, function(err, result) {
    // If an error occurred...
    if (err) {
        let params = { displayReq: "Error", err: err };
        console.log("Error in query.")
        res.render('pages/error', params);
    } else {
        //let rsList = [];
        //(result.rows).forEach(rslt => { rsList.push(rslt['type']); });
        const params = { heading: "Transfer added", accounts: ['Checking 1', 'Savings 1'] };
        // Log this to the console for debugging purposes.
        console.log("Transfer successfully added.");
        res.render('pages/transfers', params);
    }
  });
});

router.get('/', function(req, res) {
  const sql = "SELECT name FROM account WHERE user_id = 1";
  
  pool.query(sql, function(err, result) {
    // If an error occurred...
    if (err) {
        let params = { displayReq: "Error", err: err };
        console.log("Error in query.")
        res.render('pages/error', params);
    } else {
        let rsList = [];
        (result.rows).forEach(rslt => { rsList.push(rslt['name']); });
        params = { heading: "Transfers", accounts: rsList };
        // Log this to the console for debugging purposes.
        console.log("Account dropdown list loaded.");
        console.log(rsList);
        res.render('pages/transfers', params);
    }
  });
});

module.exports = router;

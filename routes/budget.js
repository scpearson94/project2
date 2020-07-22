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

/* POST home page. */
router.post('/', urlencodedParser, function(req, res) {
  res.render('pages/budget', { heading: "Budget Review" });
});

router.get('/', function(req, res) {
  const sql = "SELECT amount, name, goal FROM expense JOIN category ON expense.category_id = category.id where expense.user_id = 1";

  pool.query(sql, function(err, result) {
    // If an error occurred...
    if (err) {
        let params = { displayReq: "Error", err: err };
        console.log("Error in query.")
        res.render('pages/error', params);
    } else {
        let categories = [];
        (result.rows).forEach(expense => { 
          const name = expense['name'];
          const amount = expense['amount'];
          const goal = expense['goal'];
          if (!categories.includes(name)) { 
            categories[name] = [ amount, goal ]; 
          } else {
            categories[name][0] += amount;
          }
        });
        console.log(result.rows);
        const params = { heading: "Budget Review", categories: categories };
        // Log this to the console for debugging purposes.
        console.log("Budget loaded.");
        res.render('pages/budget', params);
    }
  });
});

module.exports = router;

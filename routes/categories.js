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

/* POST categories page. */
router.post('/', urlencodedParser, function(req, res) {
  const name = req.body.name;
  const goal = req.body.goal;
  const sql = "INSERT INTO category (name, user_id, goal) VALUES ('" + name + "', 1, " + goal + ")";

  pool.query(sql, function(err, result) {
      // If an error occurred...
      if (err) {
          let params = { displayReq: "Error", err: err };
          console.log("Error in query.")
          res.render('pages/error', params);
      } else {
          const params = { heading: "Category added" };
          // Log this to the console for debugging purposes.
          console.log("Category successfully added.");
          res.render('pages/categories', params);
      }
  });
});

router.get('/', function(req, res) {
    res.render('pages/categories', { heading: "Categories" });
});

module.exports = router;

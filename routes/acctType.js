var express = require('express');
var router = express.Router();
const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/* GET home page. */
router.get('/', getAcctTypes);

function getAcctTypes (req, res) {
    const displayReq = req.query.displayReq;
    let sql = "SELECT type FROM account_type";

    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            let params = { displayReq: "Error", err: err };
            console.log("Error in query.")
            res.render('error', params);
        } else {
            const dispResult = JSON.stringify(result.rows);
            let params = { displayReq: displayReq, result: dispResult };
            // Log this to the console for debugging purposes.
            console.log("Back from DB with result.");
            console.log(dispResult);
            res.render('display.ejs', params)
        }
    });
}

module.exports = router;

var express = require('express');
//var mysql = require('mysql');
var router = express.Router();
const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;
//var connection = mysql.createConnection({connectionString: connectionString, multipleStatements: true});
const pool = new Pool({connectionString: connectionString});
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

router.get('/', async function(req, res) {
    const sql = "SELECT from_account_id, to_account_id, amount, description, transfer_date FROM transfer";
    
    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            let params = { displayReq: "Error", err: err };
            console.log("Error in query.")
            res.render('pages/error', params);
        } else {
            // Log this to the console for debugging purposes.
            console.log("Transfers loaded.");
            //res.render('pages/transfers', { result: result.rows });
            console.log(result.rows);
            res.send(result.rows);
        }
    });
});

module.exports = router;
var express = require('express');
var router = express.Router();
const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

router.get('/', async function(req, res) {
    const sql = "SELECT name, goal FROM category";
    
    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            let params = { displayReq: "Error", err: err };
            console.log("Error in query.")
            res.render('pages/error', params);
        } else {
            // Log this to the console for debugging purposes.
            console.log("Categories loaded.");
            console.log(result.rows);
            res.send(result.rows);
        }
    });
});

module.exports = router;
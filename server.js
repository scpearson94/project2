require('dotenv').config();

const express = require("express");
const app = express();
const { Pool } = require("pg");
const port = normalizePort(process.env.PORT || '3000');
const connectionSTring = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});

app.set('port', port);

/**
 * Test query
 */
var sql = "SELECT * FROM some_table_here";

pool.query(sql, function(err, result) {
    // If an error occurred...
    if (err) {
        console.log("Error in query: ")
        console.log(err);
    }

    // Log this to the console for debugging purposes.
    console.log("Back from DB with result:");
    console.log(result.rows);


}); // end of test query

function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }
  
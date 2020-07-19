require('dotenv').config();

const debug = require('debug')('project2:server');
const express = require("express");
const http = require('http');
const path = require('path');
const app = express();
const port = normalizePort(process.env.PORT || '3000');

var indexRouter = require('./routes/index');
var homeRouter = require('./routes/home');
var displayRouter = require('./routes/display');
var acctTypeRouter = require('./routes/acctType');
var expensesRouter = require('./routes/expenses');
var expenseLoaderRouter = require('./routes/expense_loader');
var transfersRouter = require('./routes/transfers');
var budgetRouter = require('./routes/budget');

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .set('port', port)
  .use('/', indexRouter)
  .use('/home', homeRouter)
  .use('/display', displayRouter)
  .use('/account_types', acctTypeRouter)
  .use('/expenses', expensesRouter)
  .use('/expense_loader', expenseLoaderRouter)
  .use('/transfers', transfersRouter)
  .use('/budget', budgetRouter)
  .use('/add_expense', expensesRouter)

  // Handle POST requests to /signup.
  app.post('/signup', function(request, response) {

  // Retrieve the person from the URI query string.
  const first_name = request.query.first_name;
  const last_name = request.query.last_name;
  const username = request.query.username;
  const password = request.query.password;

  // If there is a person, and the raw JSON data has such a key, return the
  // associated data.
  // If there is no person, or the raw JSON data has no such key, return
  // an error object.
  if (validateData(first_name) && validateData(last_name) 
    && validateData(username) && validateData(password)) {
    console.log( "Sign up: ", first_name );
  } else {
    response.render( "pages/error", { displayReq: "Error", err: "Could not retrieve data"} );
  }

  // End the response.
  response.end();
});

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(app.get('port'));
server.on('error', onError);
server.on('listening', onListening);

function validateData(data) {
  if (data !== undefined /*&& data.hasOwnProperty(person)*/) {
    return true;
  } else {
    return false;
  }
}

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

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
  
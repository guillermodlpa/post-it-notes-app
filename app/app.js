 // Load the http module to create an http server.
var http = require('http');

var _ip = '0.0.0.0';
var _port = 8000;

var express = require('express');
var app = express();

// all routes are in routes/index.js
var routes = require('./controllers/routes')(app);

// Listen on port 8000, IP defaults to 127.0.0.1
app.listen(_port, _ip);

// Put a friendly message on the terminal
console.log('Server running at http://'+_ip+'/'+_port);
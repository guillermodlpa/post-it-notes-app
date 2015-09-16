
// var mapController = require("./map_controller");

var MongoClient = require('mongodb').MongoClient;
var mongoDbUrl = "mongodb://localhost:27017/exampleDb";

exports.index = function( request, response, next ) {
	// response.writeHead(200, {'Content-Type': 'text/plain'});
	// response.end('Hello World!\n');
	response.render('index', { title: 'Title' });
};

exports.increaseCounter = function( request, response, next ) {

	// Connect to the db
	MongoClient.connect( mongoDbUrl , function(err, db) {
		if(err) {
			response.end('failure in response');
		}
		else {
			response.end('success in response ');

			// close connection
			db.close();
		}
	});


}
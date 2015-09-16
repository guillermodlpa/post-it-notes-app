
// var mapController = require("./map_controller");

var MongoClient = require('mongodb').MongoClient;
// Database name is set on config.yaml, the puphpet file
var mongoDbUrl = "mongodb://localhost:27017/local_mapins";

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
			// response.out('success in response ');

			var collection = db.collection('clicks');

			var newClick = { date: new Date(), fromUser: 1 };

			collection.insert( newClick, function(err, result) {

				if ( err ) {
					response.end('failure in inset');
					return;
				}

				collection.find({fromUser: 1}).toArray(function (err, result) {

					if (err) {
						response.end(err);
					} else if (result.length) {
						response.end('Found:' + result.length);
					} else {
						response.end('No document(s) found with defined "find" criteria!');
					}
					//Close connection
					db.close();
				});
			});

		}
	});
}


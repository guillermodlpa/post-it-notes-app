
// var mapController = require("./map_controller");

var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');

// Database name is set on config.yaml, the puphpet file
var mongoDbUrl = "mongodb://localhost:27017/local_post_it_notes_app";

exports.index = function( request, response, next ) {
	// response.writeHead(200, {'Content-Type': 'text/plain'});
	// response.end('Hello World!\n');
	response.render('index', { title: 'Title' });
};

exports.increaseCounter = function( request, response, next ) {

	mongoose.connect(mongoDbUrl);

	var db = mongoose.connection;
	db.on('error', function(){
		response.end('failure in response');
	});
	db.once('open', function (callback) {

		var kittenSchema = mongoose.Schema({
			name: String,
			// date: Date, default: Date.now
		});

		var Kitten = mongoose.model('Kitten', kittenSchema);

		var noisy = new Kitten({ name: 'Noisy' });
		// response.end(noisy.name); // 'Noisy'

		// save to db
		noisy.save(function (err, fluffy) {} );

		Kitten.find(function (err, kittens) {
			if (err) return response.end(err);
			response.end(kittens.length);
		});

	});
}


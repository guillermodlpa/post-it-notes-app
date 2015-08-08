
// var mapController = require("./map_controller");

exports.index = function( request, response, next ) {
	// response.writeHead(200, {'Content-Type': 'text/plain'});
	// response.end('Hello World!\n');
	response.render('index', { title: 'Title' });
};

exports.increaseCounter = function( request, response, next ) {

	response.end('OK');
}
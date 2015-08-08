
// var mapController = require("./map_controller");

module.exports = function (app) {

	app.get('/', function(request, response){
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.end('Hello World1!\n');
	});
}
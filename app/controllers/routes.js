// ROUTES
// routes/index.js

var indexController = require("./index_controller");

module.exports = function (app) {

	app.get('/', indexController.index);

	app.get('/increaseCounter', indexController.increaseCounter);

	//app.get('/map', mapController.index);

	// app.get('/:username', mapController.index);
}
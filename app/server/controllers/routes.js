// ROUTES
// routes/index.js

var indexController = require("./index_controller");
var todoListController = require("./todo_list_controller");

module.exports = function (app) {

	app.get('/', indexController.index);

	app.get('/todo', todoListController.index);
	app.get('/todo/new', todoListController._new);

	//app.get('/map', mapController.index);

	// app.get('/:username', mapController.index);
}
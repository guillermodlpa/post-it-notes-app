// ROUTES
// routes/index.js

var indexController = require("./IndexController");
var todoListController = require("./todoListController");

module.exports = function (app) {

	app.get('/', indexController.index);

	app.get('/todo', todoListController.index);
	app.post('/todo/add', todoListController.add);

	app.post('/todo/remove/:id', todoListController.remove);

	//app.get('/map', mapController.index);

	// app.get('/:username', mapController.index);
}
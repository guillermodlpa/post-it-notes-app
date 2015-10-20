// ROUTES
// routes/index.js

var indexController = require("./IndexController");
var postItNotesController = require("./postItNotesController");

module.exports = function (app) {

	app.get('/', indexController.index);

	app.get('/post_it_note', postItNotesController.index);
	app.post('/post_it_note/add', postItNotesController.add);
	app.post('/post_it_note/edit/:id', postItNotesController.edit);
	app.post('/post_it_note/remove/:id', postItNotesController.remove);

	//app.get('/map', mapController.index);

	// app.get('/:username', mapController.index);
}
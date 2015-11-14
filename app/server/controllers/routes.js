// ROUTES
// routes/index.js

var indexController = require("./IndexController");
var postItNotesController = require("./postItNotesController");

module.exports = function (app) {

	app.get('/', indexController.index);

	app.get('/post_it_note', postItNotesController.index);

	// RESTful API for post it notes
	app.get('/post_it_note/:id', postItNotesController.get);
	app.post('/post_it_note', postItNotesController.add);
	app.patch('/post_it_note/:id', postItNotesController.edit);
	app.delete('/post_it_note/:id', postItNotesController.remove);
}
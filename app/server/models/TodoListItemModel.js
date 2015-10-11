var mongoose = require("mongoose");

// declare schema
var todoListItemSchema = mongoose.Schema({
	content: String,
	date: {type: Date, default: Date.now}
});

// create model
var TodoListItem = mongoose.model('TodoListItem', todoListItemSchema);

// exporting only the model
module.exports = TodoListItem;
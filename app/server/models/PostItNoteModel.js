var mongoose = require("mongoose");

// declare schema
var postItNotesSchema = mongoose.Schema({
	content: String,
	date: {type: Date, default: Date.now},
	coords: {top: Number, left: Number }
});

// create model
var PostItNote = mongoose.model('PostItNote', postItNotesSchema);

// exporting only the model
module.exports = PostItNote;

// var mapController = require("./map_controller");

var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');

// Database name is set on config.yaml, the puphpet file
var mongoDbUrl = "mongodb://localhost:27017/local_todo_list";

exports.index = function( req, res, next ) {

	mongoose.connect(mongoDbUrl);

	var db = mongoose.connection;
	db.on('error', function(){
		_sendError( res, 'errorOpeningDbConnection' );
	});
	db.once('open', function (callback) {

		// declare schema
		var todoListItemSchema = mongoose.Schema({
			text: String,
			date: {type: Date, default: Date.now}
		});

		// create model
		var TodoListItem = mongoose.model('TodoListItem', todoListItemSchema);

		// find all
		TodoListItem.find(function (err, todoListItems) {
			if (err) {
				_sendError( res, 'errorWithFindTodoListItems' );
			} else {
				_sendResponse( res, todoListItems );
			}
		});
	});
};

exports._new = function( req, res, next ) {

	mongoose.connect(mongoDbUrl);

	var db = mongoose.connection;
	db.on('error', function(){
		_sendError( res, 'errorOpeningDbConnection' );
	});
	db.once('open', function (callback) {

		// declare schema
		var todoListItemSchema = mongoose.Schema({
			text: String,
			date: {type: Date, default: Date.now}
		});

		// create model
		var TodoListItem = mongoose.model('TodoListItem', todoListItemSchema);

		var item = new TodoListItem({ text: 'Noisy' });

		// save to db
		noisy.save(function (err, fluffy) {
			if ( err ) {
				_sendError( res, 'errorWithSavingItem' );
			} else {
				_sendResponse( res );
			}
		});
	});
};


/**
 * little helper function to send back JSON encoded responses
 */
function _sendResponse( response, object ) {
	response.end( JSON.stringify({
		status: 'success',
		data: object
	}));
}
/**
 * little helper function to send back JSON encoded ERROR responses
 */
function _sendError( response, errorCode, object ) {
	response.end( JSON.stringify({
		status: 'error',
		code: errorCode,
		data: object
	}));
}
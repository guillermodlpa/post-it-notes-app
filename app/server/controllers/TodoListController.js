var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');

// Database name is set on config.yaml, the puphpet file
var mongoDbUrl = "mongodb://localhost:27017/local_todo_list";

//////////////
// Model dependencies
var TodoListItemModel = require('../models/TodoListItemModel');

//////////////
// Public Methods
module.exports = {
	index: index,
	add: add,
	remove: remove
}

//////////////
// Controller functions

function index( req, res, next ) {

	mongoose.connect(mongoDbUrl);
	var db = mongoose.connection;
	db.on('error', function(){
		_sendError( res, 'errorOpeningDbConnection' );
	});
	db.once('open', function (callback) {

		// find all
		TodoListItemModel.find(function (err, todoListItems) {
			if (err) {
				_sendError( res, 'errorWithFindTodoListItems' );
			} else {
				_sendResponse( res, todoListItems );
			}
			db.close();
		});
	});
};

function add( req, res, next ) {

	// get parameter with item content
	var itemContent = typeof req.body.content !== 'undefined' ? req.body.content : '';

	// validate
	if ( !itemContent ) {
		_sendError( res, 'emptyParams' );
		return;
	}

	// prepare DB
	mongoose.connect(mongoDbUrl);
	var db = mongoose.connection;
	db.on('error', function(){
		_sendError( res, 'errorOpeningDbConnection' );
	});
	db.once('open', function (callback) {

		var item = new TodoListItemModel({ content: itemContent });

		// save to db
		item.save(function (err, fluffy) {
			if ( err ) {
				_sendError( res, 'errorWithSavingItem' );
			} else {
				_sendResponse( res, item );
			}
			db.close();
		});
	});
};


function remove( req, res, next ) {

	var idToDelete = req.params.id;

	// validate
	if ( !idToDelete ) {
		_sendError( res, 'emptyParams' );
		return;
	}

	mongoose.connect(mongoDbUrl);
	var db = mongoose.connection;
	db.on('error', function(){
		_sendError( res, 'errorOpeningDbConnection' );
	});
	db.once('open', function (callback) {

		// remove from db
		TodoListItemModel.remove({_id: idToDelete}, function( err, removed ) {

			if ( !removed ) {
				_sendError( res, 'errorRemovingFromDb' );
			} else {
				_sendResponse( res, removed );
			}
			db.close();
		});
	});
}

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
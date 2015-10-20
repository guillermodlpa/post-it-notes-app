var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');

// Database name is set on config.yaml, the puphpet file
var mongoDbUrl = "mongodb://localhost:27017/local_todo_list";

//////////////
// Model dependencies
var PostItModel = require('../models/PostItModel');

//////////////
// Public Methods
module.exports = {
	index: index,
	add: add,
	edit: edit,
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
		PostItModel.find(function (err, postItNotes) {
			if (err) {
				_sendError( res, 'errorWithFindPostItNotes' );
			} else {
				_sendResponse( res, postItNotes );
			}
			db.close();
		});
	});
};

function add( req, res, next ) {

	// get parameter with post it note content
	var postItNoteContent = typeof req.body.content !== 'undefined' ? req.body.content : '';

	// validate
	if ( !postItNoteContent ) {
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

		var postItNote = new PostItModel({ content: postItNoteContent });

		// save to db
		postItNote.save(function (err, fluffy) {
			if ( err ) {
				_sendError( res, 'errorWithSavingPostItNote' );
			} else {
				_sendResponse( res, postItNote );
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
		PostItModel.remove({_id: idToDelete}, function( err, removed ) {

			if ( !removed ) {
				_sendError( res, 'errorRemovingFromDb' );
			} else {
				_sendResponse( res, removed );
			}
			db.close();
		});
	});
}

function edit( req, res, next ) {

	var idToEdit = req.params.id;

	// validate
	if ( !idToEdit ) {
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
		PostItModel.update({_id: idToEdit}, {content: req.body.content }, function( err, raw ) {

			if ( err ) {
				_sendError( res, 'errorRemovingFromDb' );
			} else {
				_sendResponse( res );
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
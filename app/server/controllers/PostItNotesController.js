var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');

// Database name is set on config.yaml, the puphpet file
var mongoDbUrl = "mongodb://localhost:27017/local_post_it_notes_app";

//////////////
// Model dependencies
var PostItNoteModel = require('../models/PostItNoteModel');

//////////////
// Public Methods
module.exports = {
	index: index,
	get: get,
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
		PostItNoteModel.find(function (err, postItNotes) {
			if (err) {
				_sendError( res, 'errorWithFindPostItNotes' );
			} else {
				_sendResponse( res, postItNotes );
			}
			db.close();
		});
	});
};

function get( req, res, next ) {

	var postItNoteId = req.params.id;

	// validate
	if ( !postItNoteId ) {
		_sendError( res, 'emptyParams' );
		return;
	}

	mongoose.connect(mongoDbUrl);
	var db = mongoose.connection;
	db.on('error', function(){
		_sendError( res, 'errorOpeningDbConnection' );
	});
	db.once('open', function (callback) {

		// find all
		PostItNoteModel.find({_id: postItNoteId}, function (err, postItNotes) {
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

	console.log('PostItNotesController: add');
	console.log(req.body);

	// get parameter with post it note content
	var postItNoteContent = typeof req.body.content !== 'undefined' ? req.body.content : '...';

	// prepare DB
	mongoose.connect(mongoDbUrl);
	var db = mongoose.connection;
	db.on('error', function(){
		_sendError( res, 'errorOpeningDbConnection' );
	});
	db.once('open', function (callback) {

		var postItNote = new PostItNoteModel({ content: postItNoteContent });

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

	console.log('PostItNotesController: remove');

	var postItNoteId = req.params.id;

	// validate
	if ( !postItNoteId ) {
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
		PostItNoteModel.remove({_id: postItNoteId}, function( err, removed ) {

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

	console.log('PostItNotesController: edit');
	// console.log(req.body);
	// console.log(req.params);

	var postItNoteId = req.params.id;

	// validate
	if ( !postItNoteId ) {
		_sendError( res, 'emptyParams' );
		return;
	}

	// we save all the body passed, but for safety we remove stuff that wouldn't be edited
	delete req.body._id;
	delete req.body._v;
	delete req.body.date;

	mongoose.connect(mongoDbUrl);
	var db = mongoose.connection;
	db.on('error', function(){
		_sendError( res, 'errorOpeningDbConnection' );
	});
	db.once('open', function (callback) {

		PostItNoteModel.update({_id: postItNoteId}, req.body, function( err, raw ) {

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
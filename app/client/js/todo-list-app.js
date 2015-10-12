
// Generate app namespace
window.todoListApp = {};


////////////////////////////////
// Dependencies

// Require window dependencies
window.Handlebars = require('handlebars');
window.Backbone = require('backbone');
window._ = require('underscore');
window.$ = require('jquery'); // this guy is not actually aliased, but shimmed. Why? Other JS plugins could use it and we don't wanna load it twice or hide it

// Insert jQuery and Underscore into Backbone scope
Backbone.$ = $;
Backbone._ = _;

////////////////////////////////
// Handlebars helpers

////////////////////////////////
// Mixins and helpers


////////////////////////////////
// Backbone Models

////////////////////////////////
// Backbone Collections

////////////////////////////////
// Backbone Views

var BaseView = require('./views/BaseView');

////////////////////////////////
// App Methods

function _init() {

	// create the app global event aggregator
	var eventAggregator = _.extend({}, Backbone.Events);

	new BaseView({
		eventAggregator: eventAggregator
	});
}

////////////////////////////////
// App Interface
window.todoListApp = function() {
	return {
		init: _init
	}
}();


////////////////////////////////
// App Kick off

$(function(){
	window.todoListApp.init();
});

/*
$(function(){

	$.ajax({
		url: window.location.pathname + 'todo'
	})
	.done(function( result ){
		alert(result);
	})
	.fail(function(){
		alert('fail');
	});

	var $adderForm = $('#todoListAdderForm');

	// override default form behavior so it is an ajax submission
	$adderForm.on('submit', function(){

		$.ajax({
			type: 'POST',
			url: window.location.pathname + 'todo/new',
			data: $adderForm.serialize()
		})
		.done( function( response ) {
			alert(response);
		})
		.fail( function() {
			alert('fail');
		});

		// stop submission
		return false;
	});

});*/
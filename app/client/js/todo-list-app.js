
// Generate app namespace
window.todoListApp = {};


////////////////////////////////
// Dependencies

// Require Backbone dependencies from window for now
var $ = window.$;
var _ = window._;

// Require handlebars and backbone
window.Handlebars = require('handlebars');
window.Backbone = require('backbone');

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
	new BaseView();
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
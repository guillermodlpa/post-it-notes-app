
// Generate app namespace
window.postItNotesApp = {};


////////////////////////////////
// Dependencies

// Require window dependencies
window.Handlebars = require('handlebars');
window.Backbone = require('backbone');
window._ = require('underscore');
window.$ = window.jQuery = require('jquery'); // this guy is not actually aliased, but shimmed. Why? Other JS plugins could use it and we don't wanna load it twice or hide it
require('jquery-ui');

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
window.postItNotesApp = function() {
	return {
		init: _init
	}
}();

module.exports = window.postItNotesApp;


////////////////////////////////
// App Kick off

$(function(){
	window.postItNotesApp.init();
});
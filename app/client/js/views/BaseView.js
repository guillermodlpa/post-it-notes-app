var Backbone = require('backbone');

var PostItNoteCollection = require('../collections/PostItNoteCollection');
var PostItNoteView = require('./PostItNoteView');

module.exports = Backbone.View.extend({

	el: $('body'),

	events: {
		// sumbmission of the todo list item adder
		'click #adderBtn': 'onAddNewClick'
	},

	PostItNoteCollection: null,
	eventAggregator: null,

	initialize: function( options ) {

		// passing the global event aggregator for this app
		this.eventAggregator = options.eventAggregator;

		this.$postItNotesContainer = $('#postItNotesContainer');
		this.$adderForm = $('#adderForm');

		this.PostItNoteCollection = new PostItNoteCollection();

		// for debugging
		window.collection = this.PostItNoteCollection;

		// listeners structure taken from Todos example from Backbone.js
		this.listenTo( this.PostItNoteCollection, 'add', this.addOne );
		this.listenTo( this.PostItNoteCollection, 'reset', this.allAll );
		this.listenTo( this.PostItNoteCollection, 'all', this.render );

		this.render();
	},

	render: function() {

		this.initDraggable();
	},

	addOne: function( postItNote ) {
		this.$postItNotesContainer.append( this.getMarkupForNewPostItNote( postItNote ) );
	},

	addAll: function() {

		var _this = this,
			postItNotesToAdd = [];

		this.PostItNoteCollection.each( function( thisModel ) {
			postItNotesToAdd.push( _this.getMarkupForNewPostItNote(thisModel) );
		});

		this.$postItNotesContainer.append( postItNotesToAdd );
	},

	getMarkupForNewPostItNote: function( postItNote ) {
		var view = new PostItNoteView({
			model: postItNote,
			eventAggregator: this.eventAggregator
		});

		return view.render().el;
	},

	onAddNewClick: function() {

		this.PostItNoteCollection.add({}, {at:0} );
	},

	initDraggable: function (){

		this.$postItNotesContainer.find('.post-it-note').draggable({
			delay: 100,
			opacity: 0.9,
			snap: true,
			snapTolerance: 3,
			stop: function( event, ui ) {
				// trigger jQuery event on the view element directly
				$(event.target).trigger('hasBeenDragged');

			}.bind(this)
		});
	},

	destroyDraggable: function() {
		this.$postItNotesContainer.find('.post-it-note').draggable('destroy');
	}
});
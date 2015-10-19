var TodoListItemCollection = require('../collections/todoListItemCollection');
var TodoListItemView = require('./TodoListItemView')

module.exports = Backbone.View.extend({

	el: $('body'),

	events: {
		// sumbmission of the todo list item adder
		'click #todoListAdderBtn': 'onAddNewClick'
	},

	TodoListItemCollection: null,
	eventAggregator: null,

	initialize: function( options ) {

		// passing the global event aggregator for this app
		this.eventAggregator = options.eventAggregator;

		this.$listContainer = $('#todoListContainer');
		this.$adderForm = $('#todoListAdderForm');

		this.TodoListItemCollection = new TodoListItemCollection();

		// for debugging
		window.collection = this.TodoListItemCollection;

		// listeners structure taken from Todos example from Backbone.js
		this.listenTo( this.TodoListItemCollection, 'add', this.addOne );
		this.listenTo( this.TodoListItemCollection, 'reset', this.allAll );
		this.listenTo( this.TodoListItemCollection, 'all', this.render );

		this.render();
	},

	render: function() {

		this.initDraggable();
	},

	addOne: function( todoListItem ) {
		this.$listContainer.append( this.getMarkupForNewItem(todoListItem) );
	},

	addAll: function() {

		var _this = this,
			todoListItemsToAdd = [];

		this.TodoListItemCollection.each( function( thisModel ) {
			todoListItemsToAdd.push( _this.getMarkupForNewItem(thisModel) );
		});

		this.$listContainer.append( todoListItemsToAdd );
	},

	getMarkupForNewItem: function( todoListItem ) {
		var view = new TodoListItemView({
			model: todoListItem,
			eventAggregator: this.eventAggregator
		});

		return view.render().el;
	},

	onAddNewClick: function() {

		this.TodoListItemCollection.add({
			justCreated: true
		}, {at:0} );
	},

	initDraggable: function (){

		this.$listContainer.find('.todo-list-item').draggable({
			delay: 100,
			opacity: 0.9,
			snap: true,
			// stack: true
		});
	},

	destroyDraggable: function() {
		this.$listContainer.find('.todo-list-item').draggable('destroy');
	}
});
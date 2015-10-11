var TodoListItemCollection = require('../collections/todoListItemCollection');
var TodoListItemView = require('./TodoListItemView')

module.exports = Backbone.View.extend({

	el: $('body'),

	events: {
		// sumbmission of the todo list item adder
		'click #todoListAdderBtn': 'submitAddTodoListItem'
	},

	TodoListItemCollection: null,

	initialize: function() {

		this.$listContainer = $('#todoListContainer');
		this.$adderForm = $('#todoListAdderForm');

		this.TodoListItemCollection = new TodoListItemCollection();

		// listeners structure taken from Todos example from Backbone.js
		this.listenTo( this.TodoListItemCollection, 'add', this.addOne );
		this.listenTo( this.TodoListItemCollection, 'reset', this.allAll );
		this.listenTo( this.TodoListItemCollection, 'all', this.render );

		this.render();
	},

	render: function() {

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
		var view = new TodoListItemView({model: todoListItem});
		return view.render().el;
	},

	submitAddTodoListItem: function( event ) {

		$.ajax({
			type: 'POST',
			url: window.location.pathname + 'todo/add',
			data: this.$adderForm.serialize()
		})
		.done( function( response ) {

			var todoListItem = response && response.data ? response.data : false;

			if ( !todoListItem ) {
				alert("Whoops, the adding didn't work as expected");
				return;
			}

			// add a new model by passing its attributes to the collection
			TodoListItemCollection.add( todoListItem );
		})
		.fail( function() {
			alert("Whoops, the adding failed");
		});

		return false; // stop propagation
	}
});
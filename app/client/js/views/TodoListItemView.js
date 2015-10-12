module.exports = Backbone.View.extend({

	tagName: 'li',
	className: 'todo-list-item',

	template: null,

	events: {
		// on desktop, selecting happens on hover
		'mouseover': 'selectItem',
		'mouseout': 'deselectItem',

		// on mobile, selecting happens on click
		'click': 'selectItem',

		'click .item-delete': 'onDeleteItem',

		// events for handling editing the item content
		'blur .item-content': 'onContentEdited',
		'keyup .item-content': 'onContentEdited',
		'paste .item-content': 'onContentEdited'
	},

	// state variables
	isSelected: false,
	eventAggregator: null,


	initialize: function( options ) {

		// passing the global event aggregator for this app
		this.eventAggregator = options.eventAggregator;

		// bind to the item selected event from the global event aggregator, so that if another card opens, we close
		this.eventAggregator.bind('item-selected', _.bind( this.deselectItemUnlessMyself, this ) );

		// compile with Handlebars the template, in a <script> tag on the markup
		this.template = Handlebars.compile( $("#todoListItemTemplate").html() );

		this.render();
	},

	render: function() {

		// generating markup from the Handlebars template passing model's attributes
		this.$el.html( this.template( this.model.attributes ) );

		return this;
	},

	/**
	 * toggles the item as selected, and notifies thru the event aggregator so other items deselect
	 */
	selectItem: function() {

		// if already selected (hovered on desktop), just skip
		if ( this.isSelected ) {
			return;
		}

		this.isSelected = true;
		this.updateSelectedStateView();

		// trigger the event on the global app event aggregator, so other items can deselect
		this.eventAggregator.trigger('item-selected', this ); // pass ourselves so we can not deslect ourselves
	},

	/**
	 * deselects this item.
	 */
	deselectItem: function() {

		if ( !this.isSelected ) {
			return;
		}

		this.isSelected = false;
		this.updateSelectedStateView();
	},

	/**
	 * callback for any item being selected, notified globally.
	 * allows to deselect all items when one is selected, except for the one that was selected
	 */
	deselectItemUnlessMyself: function( view ) {
		if ( this.isSelected && view !== this ) {
			this.deselectItem();
		}
	},

	/**
	 * changes the selected state on the view
	 */
	updateSelectedStateView: function() {
		this.$el.toggleClass('is-selected', this.isSelected );
	},

	/**
	 * handles the delete action triggered from the UI
	 */
	onDeleteItem: function() {

		// destroy the model. This method is overriden to notify the server
		this.model.destroy();

		// make view dissapear
		this.remove();
	},

	/**
	 * on saved content, debounces the change and calls the model's action for saving
	 */
	onContentEdited: function() {

		var _this = this;

		clearInterval( this.contentEditingTimer );
		this.contentEditingTimer = setTimeout( function() {

			// the model handles this action
			_this.model.saveContent( _this.$el.find('.item-content').html() );
		}, 1000);
	}
});
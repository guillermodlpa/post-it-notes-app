module.exports = Backbone.View.extend({

	tagName: 'li',
	className: 'post-it-note',

	template: null,

	events: {
		// on desktop, selecting happens on hover
		'mouseover': 'selectPostItNote',
		'mouseout': 'deselectPostItNote',

		// on mobile, selecting happens on click
		'click': 'selectPostItNote',

		'click .post-it-note-delete': 'onDelete',

		// events for handling editing the post it note content
		'blur .post-it-note-content': 'onContentEdited',
		'keyup .post-it-note-content': 'onContentEdited',
		'paste .post-it-note-content': 'onContentEdited',

		// dragging
		'hasBeenDragged': 'afterDragging'
	},

	// state variables
	isSelected: false,
	eventAggregator: null,


	initialize: function( options ) {

		// passing the global event aggregator for this app
		this.eventAggregator = options.eventAggregator;

		// bind to the item selected event from the global event aggregator, so that if another card opens, we close
		this.eventAggregator.bind('post-it-note-selected', _.bind( this.deselectPostItNoteUnlessMyself, this ) );

		// compile with Handlebars the template, in a <script> tag on the markup
		this.template = Handlebars.compile( $("#postItNoteTemplate").html() );

		this.render();
	},

	render: function() {

		// generating markup from the Handlebars template passing model's attributes
		this.$el.html( this.template( this.model.attributes ) );

		this.$el.find('.post-it-note-content').prop('contentEditable',true);

		return this;
	},

	/**
	 * toggles the item as selected, and notifies thru the event aggregator so other items deselect
	 */
	selectPostItNote: function() {

		// if already selected (hovered on desktop), just skip
		if ( this.isSelected ) {
			return;
		}

		this.isSelected = true;
		this.updateSelectedStateView();

		// trigger the event on the global app event aggregator, so other items can deselect
		this.eventAggregator.trigger('post-it-note-selected', this ); // pass ourselves so we can not deslect ourselves
	},

	/**
	 * deselects this item.
	 */
	deselectPostItNote: function() {

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
	deselectPostItNoteUnlessMyself: function( view ) {
		if ( this.isSelected && view !== this ) {
			this.deselectPostItNote();
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
	onDelete: function() {

		// destroy the model. This method notifies the server as long as the post it note has an ID
		this.model.destroy({
			success: function(model, response) {
				console.log('Successfully deleted!');
			},
			error: function(model, error) {
				console.log(model.toJSON()); // this log would be removed in prod
				console.log(error.responseText);
			}
		});

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
			var contentHtml = _this.$el.find('.post-it-note-content').html();

			// only save when there is content
			_this.model.save({content: contentHtml}, {
				wait: false, // wait true would be used to update model after success. Default is false, but left this here for learning purposes
				success: function(model, response) {
					console.log('Successfully saved!');
				},
				error: function(model, error) {
					console.log(model.toJSON()); // this log would be removed in prod
					console.log(error.responseText);
				}
			});
		}, 1000);
	},

	/**
	 * triggered when the item has been dragged
	 */
	afterDragging: function() {

	}
});
module.exports = Backbone.Model.extend({

	defaults: {
		_id: null,
		content: '',
		date: null
	},

	initialize: function() {

	},

	/**
	 * method exteded to notify the server about this removal
	 */
	destroy: function() {

		$.ajax({
			type: 'POST',
			url: window.location.pathname + 'todo/remove/'+ this.get('_id'),
			dataType: 'json'
		})
		.done( function( response ) {
			if ( !response.status || response.status !== 'success' ) {
				alert('not good stuff deleting');
			}
		})
		.fail( function() {
			alert('bad stuff deleting');
		});

		Backbone.Model.prototype.destroy.call( this );
	},

	/**
	 * updates the internal content variable and lets the server know
	 */
	saveContent: function( content ) {

		this.set('content', content);

		$.ajax({
			type: 'POST',
			url: window.location.pathname + 'todo/edit/'+ this.get('_id'),
			dataType: 'json',
			data: {
				content: content
			}
		})
		.done( function( response ) {
			if ( !response.status || response.status !== 'success' ) {
				alert('not good stuff deleting');
			}
		})
		.fail( function() {
			alert('bad stuff deleting');
		});
	}
});
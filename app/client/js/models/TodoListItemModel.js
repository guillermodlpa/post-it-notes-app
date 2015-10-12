module.exports = Backbone.Model.extend({

	defaults: {

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
	}
});
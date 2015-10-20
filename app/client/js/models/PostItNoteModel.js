module.exports = Backbone.Model.extend({

	// url used for automatically saving and fetching from server
	url: 'post_it_note',

	defaults: {
		_id: null,
		content: '',
		date: null,
		justCreated: false,
		positions: {
			left: 0,
			top: 0
		}
	},

	initialize: function() {

	},

	/**
	 * method exteded to notify the server about this removal
	 */
	destroy: function() {

		Backbone.Model.prototype.destroy.call( this );

		// if destroying and it wasn't saved yet to the DB, simply return
		if ( this.get('justCreated') === true ) {
			return;
		}

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
	},

	// /**
	//  * updates the internal content variable and lets the server know
	//  */
	// saveContent: function( content ) {

	// 	var _this = this,
	// 		isUpdate = true;

	// 	this.set('content', content);

	// 	// if a new save, use the add route
	// 	if ( this.get('justCreated') === true ) {
	// 		isUpdate = false;
	// 		this.set('justCreated', false);
	// 	}
	// 	// if editing existing, make sure the id is valid
	// 	else if ( isUpdate && !this.get('_id')>0 ) {
	// 		alert('not good stuff editing. no id');
	// 		return;
	// 	}

	// 	$.ajax({
	// 		type: 'POST',
	// 		url: window.location.pathname + (isUpdate ? 'todo/edit/'+ this.get('_id') : 'todo/add' ),
	// 		dataType: 'json',
	// 		data: {
	// 			content: content
	// 		}
	// 	})
	// 	.done( function( response ) {
	// 		if ( !response.status || response.status !== 'success' ) {
	// 			alert('not good stuff editing');
	// 			_this.set('justCreated', true);
	// 		}

	// 		// override local model attributes with the ones received from server. This is how we get _id
	// 		if ( !isUpdate && response.data ) {
	// 			_.extend( _this.attributes, response.data );
	// 		}
	// 	})
	// 	.fail( function() {
	// 		alert('bad stuff editing');
	// 		_this.set('justCreated', true);
	// 	});
	// },

	// _getSavableProperties: function() {
	// 	return {
	// 		content: content,

	// 	}
	// }
});
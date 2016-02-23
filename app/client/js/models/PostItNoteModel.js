var Backbone = require('backbone');

module.exports = Backbone.Model.extend({

	// url used for automatically saving and fetching from server
	urlRoot: 'post_it_note',

	// default idAttribute is 'id', but MongoDB uses _id instead
	idAttribute: '_id',

	defaults: {
		_id: null,
		content: 'Write me!',
		date: null,
		coords: {
			left: -1,
			top: -1
		}
	},

	initialize: function() {

	},
});
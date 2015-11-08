module.exports = Backbone.Collection.extend({

	url: 'post_it_note',

	model: require('../models/PostItNoteModel'),

	initialize: function() {

		// fetch models from this.url
		this.fetch();
	},

	parse: function(response) {
		return response && response.data ? response.data : [];
	},
});
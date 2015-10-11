module.exports = Backbone.Collection.extend({

	url: window.location.pathname + 'todo',

	model: require('../models/TodoListItemModel'),

	initialize: function() {

		// fetch models from this.url
		this.fetch();
	},

	parse: function(response) {
		return response && response.data ? response.data : [];
	},
});
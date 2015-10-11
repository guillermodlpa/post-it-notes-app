module.exports = Backbone.View.extend({

	tagName: 'li',
	className: 'todo-list-item',

	template: null,

	events: {},

	initialize: function() {

		// compile with Handlebars the template, in a <script> tag on the markup
		this.template = Handlebars.compile( $("#todoListItemTemplate").html() );

		this.render();
	},

	render: function() {

		// generating markup from the Handlebars template passing model's attributes
		this.$el.html( this.template( this.model.attributes ) );

		return this;
	},
});
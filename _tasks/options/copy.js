module.exports = {

	// to be requested directly by browsers
	publicComponents: {
		expand: true,
		src: [
			"node_modules/jquery/dist/jquery.min.js",
		],
		dest: "app/public/js/libs",
		// flatten so the input directory structure doesn't get copied
		flatten: true
	},

	// to be required with browserify in the bundles
	frontEndAppComponents: {
		expand: true,
		src: [
			"node_modules/backbone/backbone.js",
			"node_modules/underscore/underscore.js",
		],
		dest: "app/client/js/libs",
		// flatten so the input directory structure doesn't get copied
		flatten: true
	}
}
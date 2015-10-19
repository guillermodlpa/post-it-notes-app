module.exports = {

	// to be required with browserify in the bundles
	// frontEndAppComponents: {
	// 	expand: true,
	// 	src: [
	// 		"bower_modules/jquery/dist/jquery.min.js",
	// 		"bower_modules/underscore/underscore-min.js",
	// 		"bower_modules/backbone/backbone-min.js",
	// 		"bower_modules/handlebars/handlebars.min.js",
	// 		"bower_modules/jquery-ui/jquery-ui.min.js",
	// 	],
	// 	dest: "app/client/js/libs",
	// 	// flatten so the input directory structure doesn't get copied
	// 	flatten: true
	// },

	// to be compiled with stylus
	cssPlugins: {
		expand: true,
		src: [
			"bower_modules/normalize-css/normalize.css",
		],
		dest: "app/client/styl/libs",
		// flatten so the input directory structure doesn't get copied
		flatten: true
	}
}
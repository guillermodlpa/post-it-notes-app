module.exports = {
	components: {
		expand: true,
		src: [
			"node_modules/jquery/dist/jquery.min.js",
			"node_modules/backbone/backbone-min.js",
			"node_modules/underscore/underscore-min.js"
		],
		dest: "app/public/js/libs",
		// flatten so the input directory structure doesn't get copied
		flatten: true
	}
}
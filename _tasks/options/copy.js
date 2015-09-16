module.exports = {
	components: {
		expand: true,
		src: [
			"node_modules/jquery/dist/jquery.min.js"
		],
		dest: "app/public/js/libs",
		// flatten so the input directory structure doesn't get copied
		flatten: true
	}
}
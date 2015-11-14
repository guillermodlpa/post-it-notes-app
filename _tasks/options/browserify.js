module.exports = {
	options: {
		browserifyOptions: {
			debug: true
		},
		// aliases, so we can simply do require('handlebars') from anywhere without caring where the file is
		alias: {
			'jquery': './bower_components/jquery/dist/jquery.min.js',
			'handlebars': './bower_components/underscore/underscore-min.js',
			'backbone': './bower_components/backbone/backbone-min.js',
			'handlebars': './bower_components/handlebars/handlebars.min.js',
			'jquery-ui': './bower_components/jquery-ui/jquery-ui.min.js',
		}
	},
	main: {
		options: {
		    transform: ['hbsfy'],
		    // transform: ['browserify-shim'],
		    // external: ['source-map', 'jquery']
		},
		files: {
			'app/public/js/bundles/post-it-notes-app.js': ['app/client/js/post-it-notes-app.js']
		}
	}
}
// Watches files for changes and runs tasks based on the changed files
module.exports = {
	options: {
		spawn: false,
		// livereload: true
	},
	'build-js': {
		files: [
			'./app/client/js/**/*.js'
		],
		tasks: [
			'build-js'
		]
	},
	'build-css': {
		files: [
			'./app/client/styl/**/*.styl'
		],
		tasks: [
			'build-css'
		]
	}
}
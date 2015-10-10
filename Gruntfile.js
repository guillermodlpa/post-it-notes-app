'use strict';

module.exports = function (grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Define the configuration for all the tasks
	var config = {};

	// Register config in subdirectory
	grunt.util._.extend(config, _loadConfig('./_tasks/options/'));

	// apply the configuration to grunt
	grunt.initConfig(config);

	// Load tasks registered in subfolder
	grunt.loadTasks('_tasks');

	grunt.registerTask('default', 'All compilation', function(env) {
		grunt.task.run('build-js');
	});

	grunt.registerTask('build-js', 'Build all the components and javascript', [
		'copy',
		// 'copy:tinymce-plugins',			// copy all tinymce plugins to webroot components
		'browserify',
		// 'copy:js',
		// 'copy:sui-js',
		// 'uglify'
	]);
};

// Utility function to load config options
function _loadConfig(path) {
	var glob = require('glob');
	var object = {};
	var key;

	glob.sync('*', {cwd: path}).forEach(function(option) {
		key = option.replace(/\.js$/,'');
		object[key] = require(path + option);
	});

	return object;
}

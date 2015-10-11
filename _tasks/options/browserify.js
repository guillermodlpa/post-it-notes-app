module.exports = {
    options: {
        browserifyOptions: {
            debug: true
        },
        // aliases, so we can simply do require('handlebars') from anywhere without caring where the file is
        alias: {
            'handlebars': './app/client/js/libs/handlebars.min.js', // using min file to avoid carrying handlebar's source-map dependency
            'underscore': './app/client/js/libs/underscore.js',
            'backbone': './app/client/js/libs/backbone.js'
        }
    },
    main: {
        // options: {
        //     // transform: ['uglifyify'],
        //     // transform: ['browserify-shim'],
        //     external: ['source-map', 'jquery']
        // },
        files: {
            'app/public/js/bundles/todo-list-app.js': ['app/client/js/todo-list-app.js']
        }
    }
}
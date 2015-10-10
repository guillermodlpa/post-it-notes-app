module.exports = {
    options: {
        browserifyOptions: {
            debug: true
        },
    },
    'todo-list-app': {
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
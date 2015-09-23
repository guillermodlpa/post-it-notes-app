module.exports = {
    options: {
        browserifyOptions: {
            debug: true
        }
    },
    main: {
        // options: {
        //     // transform: ['uglifyify'],
        //     // transform: ['browserify-shim'],
        //     external: ['source-map', 'jquery']
        // },
        files: {
            'app/public/js/bundles/main.js': ['app/client/js/main.js']
        }
    }
}
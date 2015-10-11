module.exports = {
    main: {
        options: {
            // linesnos: true,
            compress: true,
            "include css": true,
            // sourcemap: {
            //     inline: true
            // }
        },
        files: {
            'app/public/css/main.css': ['app/client/styl/main.styl'],
        }
    }
}
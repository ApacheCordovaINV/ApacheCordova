module.exports = function(config) {
    config.set({
        basePath: '..',
        frameworks: ['jasmine'],
        files: [
            'www/js/**/*.js',  // Tus archivos de aplicación
            'tests/unit/**/*.spec.js'  // Tus archivos de prueba
        ],
        exclude: [],
        preprocessors: {
            'www/js/**/*.js': ['coverage']
        },
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['ChromeHeadless'],
        singleRun: true,
        concurrency: Infinity
    });
};
module.exports = function(config) {
    config.set({
        // Ruta base que será usada para resolver archivos y excluir
        basePath: '..',

        // Frameworks a utilizar
        frameworks: ['jasmine'],

        // Lista de archivos/patrones a cargar en el navegador
        files: [
            // Incluir los archivos JavaScript de tu aplicación
            'www/js/app.js',
            
            // Incluir los archivos de prueba
            
            'test/unit/crud.spec.js',
            'test/unit/helpers.spec.js'
        ],

        // Lista de archivos/patrones a excluir
        exclude: [
            'www/js/index.js'  // Excluir el archivo principal de Cordova si causa problemas
        ],

        // Preprocesadores sobre los archivos antes de servirlos al navegador
        preprocessors: {
            'www/js/**/*.js': ['coverage']
        },

        // Reporteros de resultados de pruebas
        reporters: ['progress', 'coverage'],

        // Configuración del reportero de cobertura
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },

        // Puerto del servidor web
        port: 9876,

        // Habilitar/deshabilitar colores en la salida
        colors: true,

        // Nivel de logging
        logLevel: config.LOG_INFO,

        // Habilitar/deshabilitar watching de archivos y ejecutar pruebas cuando cambien
        autoWatch: false,

        // Navegadores para ejecutar las pruebas
        browsers: ['ChromeHeadless'],

        // Configuración personalizada para Chrome Headless
        customLaunchers: {
            ChromeHeadlessCI: {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox', '--disable-gpu']
            }
        },

        // Modo de ejecución única
        singleRun: true,

        // Nivel de concurrencia
        concurrency: Infinity
    });
};
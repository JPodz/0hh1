module.exports = function(grunt) {
    grunt.initConfig({

        // Minifies the HTML file(s) into the destination directory
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'src/index.html'
                }
            }
        },

        // Uses RequireJS to compile all JavaScript into the destination directory
        requirejs: {
            dist: {
                options: {
                    name: "app",
                    baseUrl: "src/",
                    mainConfigFile: "src/config.js",
                    out: "dist/js/main.js"
                }
            }
        },

        // Minifies the compiled destination JavaScript
        uglify: {
            dist: {
                files: {
                    'dist/js/main.min.js': ['dist/js/main.js']
                }
            }
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // The 'script' task compiles all JavaScript used in the app
    grunt.registerTask('script', ['requirejs', 'uglify']);

    // The 'default' task builds the entire application
    grunt.registerTask('default', ['htmlmin', 'script']);
};
var path = require('path');

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
                    name: 'app',
                    baseUrl: 'src/',
                    mainConfigFile: 'src/config.js',
                    out: 'dist/js/main.js'
                }
            }
        },

        // Minifies the compiled destination JavaScript
        uglify: {
            dist: {
                files: {
                    'dist/js/main.min.js': ['dist/js/main.js'],
                    'dist/js/require.min.js': ['dist/js/require.js']
                }
            }
        },

        // Copies the JavaScript and CSS into the destination directory
        copy: {
            js: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            'bower_components/requirejs/require.js'
                        ],
                        dest: 'dist/js',
                        filter: 'isFile'
                    }
                ]
            }
        },

        // Compiles all HTML templates used by AngularJS directives and caches them so calls don't result in any
        // HTTP requests being made during the running of the application
        ngtemplates: {
            options: {
                bootstrap: function (module, script) {
                    return 'define([],{init:function($templateCache){' + script + '}});';
                },
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: false,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                }
            },
            dist: {
                cwd: 'src/',
                src: path.join('ui/**/*.html'),
                dest: path.join('src/ui/views.js')
            }
        },

        // Compiles all LESS files into a CSS file in the destination directory
        less: {
            dist: {
                options: {
                    paths: []
                },
                files: {
                    'dist/css/main.css': 'src/ui/main.less'
                }
            }
        },

        // Minifies the compiled distination CSS
        cssmin: {
            dist: {
                files: {
                    'dist/css/main.min.css': ['dist/css/main.css']
                }
            }
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // The 'script' task compiles all JavaScript used in the app
    grunt.registerTask('script', ['ngtemplates', 'requirejs', 'copy:js', 'uglify']);

    // The `style` task compiles all CSS used in the app
    grunt.registerTask('style', ['less', 'cssmin']);

    // The 'default' task builds the entire application
    grunt.registerTask('default', ['htmlmin', 'script', 'style']);
};
module.exports = function(grunt) {
    grunt.initConfig({
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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.registerTask('default', ['htmlmin']);
};
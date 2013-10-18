/* jshint node: true */

module.exports = function(grunt) {
    "use strict";

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),

        // Task configuration.
        clean: {
            dist: ['dist']
        },

        jshint: {
            gruntfile: { src: 'Gruntfile.js' },
            src: {
                src: ['dist/jsonp.js']
            }
        },

        uglify: {
            dist: {
                src: ['dist/jsonp.js'],
                dest: 'dist/jsonp.min.js'
            }
        },

        coffee: {
            compile: {
                files: {
                    'dist/jsonp.js': 'lib/jsonp.coffee'
                }
            }
        },

        jasmine: {
            all: {
                src: 'lib/jsonp.js',
                options: {
                    specs: 'spec/*.js'
                }
            }
        }

    });


    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    // Test task.
    grunt.registerTask('test', ['compile', 'jshint', 'jasmine']);

    // Full distribution task.
    grunt.registerTask('dist', ['compile', 'uglify']);

    // Default task.
    grunt.registerTask('default', ['test', 'dist']);
    grunt.registerTask('compile', ['clean', 'coffee']);

};

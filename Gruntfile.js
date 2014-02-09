/*
 * grunt
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt/blob/master/LICENSE-MIT
 */

'use strict';

module.exports = function(grunt) {
    
    // Project configuration.

    grunt.initConfig({


        // CONSTANTS
        // ---------------------------------------------------------------------
        src_files: [
            'src/initialize.js',
            'src/utilities/domData.js',
            'src/utilities/domTraversal.js',
            'src/preProcessNode.js',
            'src/bindingHandlers.js'
            //'src/exports.js'
        ],

        spec_files: ['test/**/*spec.js'],

        pkg: grunt.file.readJSON('package.json'),


        // BUILD PROCESS
        // ---------------------------------------------------------------------
        concat: {
            all: {
                options: {
                    banner: '/*\n' +
                    ' * <%= pkg.name %> v<%= pkg.version %>\n' +
                    ' * Author: <%= pkg.author %>\n' +
                    ' * License: <%= pkg.license %>\n' +
                    ' * Date: <%= grunt.template.today("dd-mm-yyyy") %>\n' +
                    ' */\n'
                },
                src: [
                    'src/build-fragments/top.js',
                    '<%= src_files %>',
                    'src/build-fragments/bottom.js'
                ],
                dest: 'build/ko-components.js'
            }
        },

        uglify: {
            options: {
                mangle: {
                    except: []
                }
            },
            build_target: {
                files: {
                    "build/ko-components.min.js": ['build/ko-components.js']
                }
            }
            
        },


        // CLEANLINESS
        // ---------------------------------------------------------------------
        jshint: {
            files: ['src/**/*.js', 'test/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    ko: true,
                    module: true,
                    document: true
                }
            }
        },

        jasmine: {
            dev: {
                src: [
                    'lib/jquery.min.js',
                    'lib/knockout.min.js',
                    '<%= src_files %>'
                ],
                options: {
                    specs: ['<%= spec_files %>']
                }
            }
        },


        // DEV OPS
        // ---------------------------------------------------------------------
        watch: {
            files: ['<%= src_files %>'],
            tasks: ['build','jasmine']
        }

    });
    
    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    // tasks
    grunt.registerTask('test', ['jshint', 'jasmine:dev']);

    grunt.registerTask('build', ['concat','uglify'])



    // Default task.
    grunt.registerTask('default', ['watch']);

};

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
        src_files: ['src/**/*.js'],

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
                src: ['<%= src_files %>'],
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
                src: ['lib/knockout.min.js','<%= src_files %>'],
                options: {
                    specs: ['<%= spec_files %>']
                }
            }
        },


        // DEV OPS
        // ---------------------------------------------------------------------
        watch: {
            files: ['<%= src_files %>'],
            tasks: ['jshint']
        }

    });
    
    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    
    // "npm test" runs these tasks
    grunt.registerTask('test', ['jshint', 'concat', 'uglify', 'jasmine:dev']);
    
    // Default task.
    grunt.registerTask('default', ['test']);

};

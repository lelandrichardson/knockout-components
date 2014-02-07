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
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            all: {
                options: {
                    banner: '/*\n' +
                    ' * <%= pkg.name %> v<%= pkg.version %>\n' +
                    ' * Author: <%= pkg.author %>\n' +
                    ' * License: <%= pkg.license %>\n' +
                    ' * Date: <%= grunt.template.today("dd-mm-yyyy") %>\n' +
                    ' */\n',
                },
                src: ['<%= src_files %>'],
                dest: 'build/ko-components.js'
            }
        },
        watch: {
            files: ['<%= src_files %>'],
            tasks: ['jshint', 'qunit']
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
        
        qunit: {
          files: ['test/**/*.html']
        },
        
        jshint: {
            files: ['src/**/*.js', 'test/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        
        
        
        src_files: ['src/**/*.js'],
    });
    
    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-concat');
    
    
    // Some internal tasks. Maybe someday these will be released.
    grunt.loadTasks('internal-tasks');
    
    // "npm test" runs these tasks
    grunt.registerTask('test', ['jshint', 'concat', 'uglify']);
    
    // Default task.
    grunt.registerTask('default', ['test']);

};

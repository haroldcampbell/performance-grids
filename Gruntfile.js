module.exports = function (grunt) {
    grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),

            clean: {
                build: ['build'],
                tmp: ['tmp'],
                sass: ['.sass-cache']
            },

            jshint: {
                files: ['Gruntfile.js', 'app/assets/js/**/*.js', 'test/**/*.js', '!test/jasmine-jquery.js'],
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

            watch: {
                css: {
                    files: 'app/assets/sass/*',
                    tasks: ['sass'],
                    options: {
                        livereload: true
                    }
                },
                js: {
                    files: ['<%= jshint.files %>'],
                    tasks: ['jshint'],
                    options: {
                        livereload: true
                    }
                }
            },

            sass: {
                dist: {
                    files: [
                        {
                            expand: true,
                            cwd: 'app/assets/sass',
                            src: ['*.scss'],
                            dest: 'app/assets/css/',
                            ext: '.css'
                        }
                    ]
                }
            }
        }
    );

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('test', ['jshint']);
};


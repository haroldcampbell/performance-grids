module.exports = function (grunt) {
    grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),

            clean: {
                build: ['build'],
                tmp: ['tmp'],
                sass: ['.sass-cache']
            },

            jshint: {
                files: ['Gruntfile.js', 'app/assets/js/**/*.js'],
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
                html: {
                    files: '/app/**/*.html',
                    options: {
                        livereload: true

                    }
                },
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
                },
                tests: {
                    files: ['tests/**/*.js'],
                    tasks: ['jshint']
                }
            },

            protractor: {
                options: {
                    //keepAlive: true,
                    configFile: "tests/protractor.conf.js"
                },
                run: {}
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
    grunt.loadNpmTasks('grunt-protractor-runner');

    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('e2etest', [
        //'clean:server',
        //'concurrent:test',
        //'autoprefixer',
        //'connect:test',
        //'karma',
        'protractor'
    ]);
};


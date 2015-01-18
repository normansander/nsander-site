module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'css/style.css': 'sass/style.scss'
                }
            },

            dist: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                    style: 'compressed'
                },
                files: {
                    'css/style.css': 'sass/style.scss'
                }
            }
        },
        clean: ["dist"],
        copy: {
            main: {
                expand: true,
                src: [
                    '**/*',
                    '!Gruntfile.js',
                    '!node_modules/**',
                    '!package.json',
                    '!README.md',
                    '!**/dist/**',
                    '!**/sass/**'
                ],
                dest: 'dist/',
                dot: false,
                flatten: false,
                filter: 'isFile',
            },
        },
        'ftp-deploy': {
            build: {
                auth: {
                    host: 'sv02.net-housting.de',
                    port: 21,
                    authKey: 'key1'
                },
                src: 'dist',
                dest: '/html/nsander'
            }
        },
        watch: {
            css: {
                files: 'sass/*.scss',
                tasks: ['sass:dev'],
                options: {
                    livereload: true
                },
            }
        }
    });

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('dist', [
        'sass:dist',
        'clean',
        'copy',
        'ftp-deploy'
    ]);

};
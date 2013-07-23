module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({

    connect: {
      livereload: {
        options: {
          port: 8888,
          middleware: function(connect, options) {
            return[
              require('connect-livereload')(),
              connect.static(options.base),
              connect.directory(options.base)
            ];
          }
        }
      }
    },

    // clean
    clean: {
      build: ['build']
    },

    // JS min
    uglify: {
      compress: {
        files: {
          'build/js/main.js': [
            'bower_components/jquery/jquery.js',
            'bower_components/in-viewport/in-viewport.js',
            'bower_components/fastclick/lib/fastclick.js',
            'bower_components/iscroll/build/iscroll.js',
            'bower_components/prism/prism.js',
            'js/main.js'
          ]
        }
      }
    },

    // compile sass files
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'css/style.min.css': 'css/style.scss'
        }
      }
    },

    // CSS min
    cssmin: {
      compress: {
        files: {
          'build/css/main.css': [
            'bower_components/prism/prism-funky.css',
            'css/style.min.css'
          ]
        }
      }
    },

    // HTML min
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeRedundantAttributes: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true
        },
        files: {
          'build/index.html': 'build/index.html',
          'build/404.html': 'build/404.html',
          'build/pages/*.html': 'build/pages/*.html',
          'build/docs/*.html': 'build/docs/*.html'
        }
      }
    },

    // Inline asset rev
    usemin: {
      html: ['build/index.html', 'build/pages/*.html', 'build/docs/*.html'],
      css: ['build/css/main.css']
    },

    // Asset rev
    rev: {
      options: {
        algorithm: 'sha1',
        length: 8
      },
      assets: {
        files: [
          {src: ['build/img/**/*.{jpg,jpeg,gif,png,svg}']},
          {src: ['build/**/*.{css,js}']}
        ]
      }
    },

    // copy assets
    copy: {
      img: {src: ['img/**/*.{png,jpg,jpeg,gif,svg}'], dest: 'build/img', expand: true, flatten: true, filter: 'isFile'},
      html: {src: ['index.html', '404.html'], dest: 'build/', expand: true, flatten: true, filter: 'isFile'},
      meta: {src: ['robots.txt', 'crossdomain.xml', 'favicon.ico', 'humans.txt', 'apple-touch*.png'], dest: 'build/', expand: true, flatten: true, filter: 'isFile'},
      pages: {src: ['pages/*.html'], dest: 'build/pages', expand: true, flatten: true, filter: 'isFile'},
      docs: {src: ['docs/*.html'], dest: 'build/docs', expand: true, flatten: true, filter: 'isFile'}
    },

    // watch configuration
    watch: {
      options: {
        livereload: true
      },
      html: {
        files: ['**/*.html']
      },
      scss: {
        files: ['css/**/*.scss'],
        tasks: ['sass:dist'],
      }
    },

    // compress artifacts
    compress: {
      main: {
        options: {
          archive: 'page.zip'
        },
        files: [
          {src: ['build/**'], dest: '/'}
        ]
      }
    }

  });

  // load 3rd party tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-rev');
  grunt.loadNpmTasks('grunt-usemin');

  // Default
  grunt.registerTask('default', ['connect', 'watch']);
  grunt.registerTask('build', ['clean', 'sass', 'cssmin', 'uglify', 'copy', 'rev', 'usemin', 'htmlmin', 'compress']);

};
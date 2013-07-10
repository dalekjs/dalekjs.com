module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({

    // clean
    clean: {
      build: ['build']
    },

    // JS min
    uglify: {
      compress: {
        files: {
          'build/js/main.js': ['js/vendor/jquery-1.9.1.min.js', 'js/prism.js', 'js/main.js']
        }
      }
    },

    // CSS min
    cssmin: {
      compress: {
        files: {
          'build/css/main.css': ['css/normalize.css', 'css/style.min.css', 'css/prism.css']
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
          'build/index.html': 'build/index.html'
        }
      }
    },

    // Inline asset rev
    usemin: {
      html: ['build/index.html'],
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
      html: {src: ['index.html'], dest: 'build/', expand: true, flatten: true, filter: 'isFile'},
      meta: {src: ['robots.txt', 'crossdomain.xml', 'favicon.ico', 'humans.txt', 'apple-touch*.png'], dest: 'build/', expand: true, flatten: true, filter: 'isFile'},
      pages: {src: ['pages/*.html'], dest: 'build/pages', expand: true, flatten: true, filter: 'isFile'}
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
  grunt.loadNpmTasks('grunt-rev');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('build', ['clean', 'cssmin', 'uglify', 'copy', 'rev', 'usemin', 'htmlmin', 'compress']);

};
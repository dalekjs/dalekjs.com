module.exports = function(grunt) {
  'use strict';

  var fs = require('fs');

  var loadAssets = function (Handlebars) {
    var header = String(fs.readFileSync(__dirname + '/assets/header.html', 'utf-8'));
    var footer = String(fs.readFileSync(__dirname + '/assets/footer.html', 'utf-8'));
    // partials
    Handlebars.registerPartial('assets/header.html', header);
    Handlebars.registerPartial('assets/footer.html', footer);
    return Handlebars;
  };

  var loadVars = function (contents) {
    // load vars
    var vars = {};

    // defaults
    var defaults = {
      title: 'DalekJS - Automated cross browser testing with JavaScript',
      desc: 'DalekJS - Exterminate all the bugs'
    };

    var subtrs = contents.substring(contents.lastIndexOf('data-templatevars=')).replace("data-templatevars='", '');
    try {
    vars = JSON.parse(subtrs.substr(0, subtrs.indexOf("'")));
    } catch (e) {}

    Object.keys(defaults).forEach(function (key) {
      if (!vars[key]) {
        vars[key] = defaults[key];
      }
    });

    return vars;
  };

  grunt.initConfig({

    // live rendering & delivery of handlebars
    connect: {
      livereload: {
        options: {
          port: 8888,
          middleware: function(connect, options) {
            return[
              require('connect-livereload')(),
              function (req, res) {

                // check if we need to process the template data
                if (req.url.substring(req.url.lastIndexOf('.')) === '.html') {
                  var Handlebars = require('handlebars');
                  // load file contents
                  var contents = fs.readFileSync(__dirname + '/' + req.url, 'utf-8');
                  loadAssets(Handlebars);
                  var vars = loadVars(contents);
                  // send compiled template contents
                  res.end(Handlebars.compile(contents)(vars));
                  return true;
                }

                // return all other resources static
                return connect.static(options.base).apply(connect, arguments);
              },
              connect.directory(options.base),
            ];
          }
        }
      }
    },

    // clean
    clean: {
      build: ['build', 'temp']
    },

    // lint
    jshint: {
      all: ['js/main.js']
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
          'build/pages/documentation.html': 'build/pages/documentation.html',
          'build/pages/faq.html': 'build/pages/faq.html',
          'build/pages/getStarted.html': 'build/pages/getStarted.html',
          'build/pages/merch.html': 'build/pages/merch.html',
          'build/pages/support.html': 'build/pages/support.html',
          'build/docs/actions.html': 'build/docs/actions.html',
          'build/docs/assertions.html': 'build/docs/assertions.html',
          'build/docs/chrome.html': 'build/docs/chrome.html',
          'build/docs/cli.html': 'build/docs/cli.html',
          'build/docs/config.html': 'build/docs/config.html',
          'build/docs/console.html': 'build/docs/console.html',
          'build/docs/junit.html': 'build/docs/junit.html',
          'build/docs/json.html': 'build/docs/json.html',
          'build/docs/html.html': 'build/docs/html.html',
          'build/docs/drivernative.html': 'build/docs/drivernative.html',
          'build/docs/firefox.html': 'build/docs/firefox.html',
          'build/docs/internetexplorer.html': 'build/docs/internetexplorer.html',
          'build/docs/phantomjs.html': 'build/docs/phantomjs.html',
          'build/docs/reporter.html': 'build/docs/reporter.html',
          'build/docs/test.html': 'build/docs/test.html',
          'build/docs/testsuite.html': 'build/docs/testsuite.html',
          'build/docs/timer.html': 'build/docs/timer.html',
          'build/docs/webdriver.html': 'build/docs/webdriver.html'
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
      pages: {src: ['temp/*.html'], dest: 'build/pages', expand: true, flatten: true, filter: 'isFile'},
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
      scripts: {
        files: ['js/*.js'],
        tasks: ['jshint']
      },
      scss: {
        files: ['css/**/*.scss'],
        tasks: ['sass:dist']
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

  // register handlebars compile step
  grunt.registerTask('templates', function () {
    var Handlebars = require('handlebars');
    var files = fs.readdirSync(__dirname + '/pages');

    // check if the output directory exists
    if (!fs.existsSync(__dirname + '/temp')) {
      fs.mkdirSync(__dirname + '/temp');
    }

    files.forEach(function (file) {
      if (file.substring(file.lastIndexOf('.')) === '.html') {
        // load file contents
        var contents = fs.readFileSync(__dirname + '/pages/' + file, 'utf-8');
        loadAssets(Handlebars);
        var vars = loadVars(contents);
        // send compiled template contents
        var compiled = Handlebars.compile(contents)(vars);
        fs.writeFileSync(__dirname + '/temp/' + file, compiled);
        grunt.log.ok('Generated file: temp/' + file);
      }
    });
  });

  // load 3rd party tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  //grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-rev');
  grunt.loadNpmTasks('grunt-usemin');

  // Default
  grunt.registerTask('default', ['connect', 'sass', 'cssmin', 'watch']);
  grunt.registerTask('build', ['clean', 'jshint', 'sass', 'cssmin', 'uglify', 'templates', 'copy', 'rev', 'usemin', 'htmlmin'/*, 'compress'*/]);

};

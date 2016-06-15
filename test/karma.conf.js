// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-09-04 using
// generator-karma 1.0.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      "jasmine"
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/moment/moment.js',
      'bower_components/underscore/underscore.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/raphael/raphael.js',
      'bower_components/mocha/mocha.js',
      'bower_components/morris.js/morris.js',
      'bower_components/chart-angular-raphaeljs-morris/src/directives/chartangular.js',
      'bower_components/ng-file-upload/ng-file-upload.js',
      'bower_components/ngMask/dist/ngMask.js',
      'bower_components/angular-moment/angular-moment.js',
      'bower_components/cheet.js/cheet.js',
      'bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js',
      'bower_components/moment-timezone/builds/moment-timezone-with-data-2010-2020.js',
      'bower_components/ngmap/build/scripts/ng-map.js',
      'bower_components/ng-facebook/ngFacebook.js',
      'bower_components/js-marker-clusterer/src/markerclusterer.js',
      'bower_components/angular-aria/angular-aria.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-material/angular-material.js',
      'bower_components/requirejs/require.js',
      'bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.js',
      'bower_components/Chart.js/Chart.js',
      'bower_components/d3/d3.js',
      'bower_components/html5shiv/dist/html5shiv.js',
      'bower_components/webshim/js-webshim/dev/polyfiller.js',
      'bower_components/webshim/js-webshim/minified/polyfiller.js',
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/crossfilter/crossfilter.js',
      'bower_components/dcjs/dc.js',
      'bower_components/leaflet/dist/leaflet-src.js',
      'bower_components/d3-tip/index.js',
      'bower_components/angular-directive.g-signin/google-plus-signin.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      "app/scripts/**/*.js",
      "test/mock/**/*.js",
      "test/spec/**/*.js"
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      "PhantomJS"
    ],

    // Which plugins to enable
    plugins: [
      "karma-phantomjs-launcher",
      "karma-jasmine"
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};

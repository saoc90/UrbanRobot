/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function (defaults) {
  return new Angular2App(defaults, {
    vendorNpmFiles: [
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'zone.js/dist/**/*.+(js|js.map)',
      'es6-shim/es6-shim.js',
      'reflect-metadata/**/*.+(ts|js|js.map)',
      'rxjs/**/*.+(js|js.map)',
      '@angular/**/*.+(js|js.map)',
      'angular2-materialize/dist/*.+(ts|js|js.map)',
      'materialize-css/dist/js/*.+(ts|js|js.map)',
      'materialize-css/dist/css/*.css',
      'materialize-css/dist/fonts/**/*.*',
      'primeng/**/*.+(ts|js|js.map)',
      'primeui/**/*.+(ts|js|js.map)',
      'angularfire2/**/*.+(ts|js|js.map)',
      'firebase/lib/*.+(ts|js|js.map)',
      'angular2-highcharts/dist/*.+(ts|js|js.map)'

    ]
  });
};

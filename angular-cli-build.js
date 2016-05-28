/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
  return new Angular2App(defaults, {
    vendorNpmFiles: [
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'zone.js/dist/**/*.+(js|js.map)',
      'es6-shim/es6-shim.js',
      'reflect-metadata/**/*.+(js|js.map)',
      'rxjs/**/*.+(js|js.map)',
      '@angular/**/*.+(js|js.map)',
      'angular2-materialize/dist/*.js',
      'materialize-css/dist/js/*.js',
      'materialize-css/dist/css/*.css',
      'materialize-css/dist/fonts/**/*.*',
      'primeng/**/*.js',
      'primeui/**/*.*',
      'angularfire2/**/*.js',
      'firebase/lib/*.js'  
      
    ]
  });
};

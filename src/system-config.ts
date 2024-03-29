/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  'materialize-css': 'vendor/materialize-css',
  'materialize': 'vendor/angular2-materialize',
  'angular2-materialize': 'vendor/angular2-materialize',
  'primeng': 'vendor/primeng',
  'firebase': 'vendor/firebase/lib/firebase-web.js',
  'angularfire2': 'vendor/angularfire2',
  'angular2-highcharts': 'vendor/angular2-highcharts',
  'highcharts/highstock.src':   'https://cdn.rawgit.com/highcharts/highcharts-dist/v4.2.1/highstock.js'
};

/** User packages configuration. */
const packages: any = {
  'materialize-css': {
    'main': 'dist/js/materialize'
  },
  'materialize': {
    'main': 'dist/materialize-directive',
    'defaultExtension': 'js'
  },
  'primeng': { defaultExtension: 'js' },
  'angularfire2': {
    defaultExtension: 'js',
    main: 'angularfire2.js'
  },
  'angular2-highcharts': {
    defaultExtension: 'js',
    main: 'dist/index.js'
  },
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/+scan',
  'app/+setting',
  'app/+dashboard',
  'app/+login',
  'app/+scan/scan-history-list',
  'app/+scan/scan-detail',
  'app/register',
  'app/+register',
  'app/+scan/+client-detail',
  'app/+dashboard/unit-history-chart',
  'app/+admin-dashboard',
  'app/+admin-setting',
  'app/admin-setting',
  'app/+setting/admin-setting',
  'app/+setting/admin-setting/company-setting',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });

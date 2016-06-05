/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  "materialize-css": "vendor/materialize-css",
  "materialize": "vendor/angular2-materialize",
  "angular2-materialize": "vendor/angular2-materialize",
  'primeng': 'vendor/primeng',
  'firebase': 'vendor/firebase/lib/firebase-web.js',
  'angularfire2': 'vendor/angularfire2'
};

/** User packages configuration. */
const packages: any = {
  "materialize-css": {
    "main": "dist/js/materialize"
  },
  "materialize": {
    "main": "dist/materialize-directive",
    "defaultExtension": "js"
  },
  'primeng': { defaultExtension: 'js' },
  "angularfire2": {
    defaultExtension: 'js',
    main: 'dist/angularfire2.js'
  }
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

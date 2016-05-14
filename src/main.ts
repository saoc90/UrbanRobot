import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { UrbanRobotAppComponent, environment } from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';

if (environment.production) {
  enableProdMode();
}

bootstrap(UrbanRobotAppComponent, [
  FIREBASE_PROVIDERS,
  defaultFirebase('https://furry-happiness.firebaseio.com/')
]);

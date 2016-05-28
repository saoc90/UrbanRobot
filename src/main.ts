import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { UrbanRobotAppComponent, environment } from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase, AuthProviders, AuthMethods, firebaseAuthConfig } from 'angularfire2';
import { UserServiceService } from './app/shared/';

if (environment.production) {
  enableProdMode();
}

bootstrap(UrbanRobotAppComponent, [
  FIREBASE_PROVIDERS,
  defaultFirebase('https://furry-happiness.firebaseio.com/'),
  firebaseAuthConfig({
    provider: AuthProviders.Password,
    method: AuthMethods.Password,
  }),
  UserServiceService
]);

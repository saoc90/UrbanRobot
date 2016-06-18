import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { UrbanRobotAppComponent, environment } from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase, AuthProviders, AuthMethods, firebaseAuthConfig } from 'angularfire2';
import { UserServiceService } from './app/shared/';
import "angular2-materialize";


if (environment.production) {
  enableProdMode();
}

bootstrap(UrbanRobotAppComponent, [
  UserServiceService,
  FIREBASE_PROVIDERS,
  defaultFirebase({
    apiKey: "AIzaSyDDS_B0YtnyB_4Kfeax7jeWNzWk7TW46CM",
    authDomain: "furry-happiness.firebaseapp.com",
    databaseURL: "https://furry-happiness.firebaseio.com",
    storageBucket: "furry-happiness.appspot.com",
  }),
  firebaseAuthConfig({
    provider: AuthProviders.Password,
    method: AuthMethods.Password,
  })
]);

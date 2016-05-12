import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { UrbanRobotAppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(UrbanRobotAppComponent);

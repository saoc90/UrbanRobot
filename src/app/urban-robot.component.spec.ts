import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { UrbanRobotAppComponent } from '../app/urban-robot.component';

beforeEachProviders(() => [UrbanRobotAppComponent]);

describe('App: UrbanRobot', () => {
  it('should create the app',
      inject([UrbanRobotAppComponent], (app: UrbanRobotAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'urban-robot works!\'',
      inject([UrbanRobotAppComponent], (app: UrbanRobotAppComponent) => {
    expect(app.title).toEqual('urban-robot works!');
  }));
});

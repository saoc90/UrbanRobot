import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AdminDashboardComponent } from './admin-dashboard.component';

describe('Component: AdminDashboard', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [AdminDashboardComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([AdminDashboardComponent],
      (component: AdminDashboardComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(AdminDashboardComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(AdminDashboardComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-admin-dashboard></app-admin-dashboard>
  `,
  directives: [AdminDashboardComponent]
})
class AdminDashboardComponentTestController {
}


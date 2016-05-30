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
import { ScanHistoryListComponent } from './scan-history-list.component';

describe('Component: ScanHistoryList', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [ScanHistoryListComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([ScanHistoryListComponent],
      (component: ScanHistoryListComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(ScanHistoryListComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(ScanHistoryListComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-scan-history-list></app-scan-history-list>
  `,
  directives: [ScanHistoryListComponent]
})
class ScanHistoryListComponentTestController {
}


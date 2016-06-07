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
import { UnitHistoryChartComponent } from './unit-history-chart.component';

describe('Component: UnitHistoryChart', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [UnitHistoryChartComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([UnitHistoryChartComponent],
      (component: UnitHistoryChartComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(UnitHistoryChartComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(UnitHistoryChartComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-unit-history-chart></app-unit-history-chart>
  `,
  directives: [UnitHistoryChartComponent]
})
class UnitHistoryChartComponentTestController {
}


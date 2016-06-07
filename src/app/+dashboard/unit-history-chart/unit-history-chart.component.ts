import { Component, OnInit, Input } from '@angular/core';
import { CHART_DIRECTIVES } from 'angular2-highcharts';

@Component({
  moduleId: module.id,
  selector: 'app-unit-history-chart',
  templateUrl: 'unit-history-chart.component.html',
  styleUrls: ['unit-history-chart.component.css'],
  directives: [ CHART_DIRECTIVES ]
})
export class UnitHistoryChartComponent implements OnInit {
  @Input() data: number[];
  @Input() title: string;
  options: Object;
  constructor() {
    this.options = {
      title: { text: this.title},
      series: [{
        data: this.data
      }]
    };
  }

  ngOnInit() {
    this.options = {
      title: { text: this.title},
      series: [{
        data: this.data
      }]
    };
  }

}

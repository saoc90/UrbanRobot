import { Component } from '@angular/core';
import { ScanComponent } from './+scan';
import { Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import { SettingComponent } from './+setting';
import { DashboardComponent } from './+dashboard';
import {MaterializeDirective} from "angular2-materialize";


@Component({
  moduleId: module.id,
  selector: 'urban-robot-app',
  templateUrl: 'urban-robot.component.html',
  styleUrls: ['urban-robot.component.css'],
  directives: [ROUTER_DIRECTIVES, MaterializeDirective],
  providers: [ROUTER_PROVIDERS]
})
@Routes([
  {path: '/', component: DashboardComponent},
  {path: '/scan', component: ScanComponent},
  {path: '/setting', component: SettingComponent},
  {path: '/dashboard', component: DashboardComponent}
])
export class UrbanRobotAppComponent {
  title = 'urban-robot works!';
}

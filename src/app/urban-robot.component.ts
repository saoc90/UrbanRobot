import { Component } from '@angular/core';
import { ScanComponent } from './+scan';
import { Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router, OnActivate} from '@angular/router';
import { SettingComponent } from './+setting';
import { DashboardComponent } from './+dashboard';
import { MaterializeDirective } from "angular2-materialize";
import { LoginComponent } from './+login';
import { RegisterComponent } from './register';
import { UserServiceService } from './shared/user-service.service';
import { AdminDashboardComponent } from './+admin-dashboard';

@Component({
  moduleId: module.id,
  selector: 'urban-robot-app',
  templateUrl: 'urban-robot.component.html',
  styleUrls: ['urban-robot.component.css'],
  directives: [ROUTER_DIRECTIVES, MaterializeDirective, ScanComponent],
  providers: [ROUTER_PROVIDERS]
})
@Routes([
  {path: '/', component: DashboardComponent},
  {path: '/scan', component: ScanComponent},
  {path: '/setting', component: SettingComponent},
  {path: '/dashboard', component: DashboardComponent},
  {path: '/login', component: LoginComponent},
  {path: '/register', component: RegisterComponent},
  {path: '/adminDashboard', component: AdminDashboardComponent}
])
export class UrbanRobotAppComponent implements OnActivate {

  private isAdmin: boolean;

  constructor(private userService: UserServiceService, private router: Router) {
    this.userService.userInfoRef.subscribe(u => 
      this.isAdmin = u.role.includes('administrator')
    );
  }

  routerOnActivate() {
      if (!this.userService.isLogedIn()) {
        this.router.navigateByUrl('/login');
      }
  }
}

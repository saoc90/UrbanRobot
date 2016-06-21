import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import { Observable} from 'rxjs';
import 'rxjs/Rx';
import { User } from './models/user';
import { CompanyObject } from './models/companyObject';
import 'firebase';
import { LoginComponent } from '../+login/login.component';


@Injectable()
export class UserServiceService {

  private logedIn: boolean = false;
  public user: Observable<FirebaseAuthState>;
  public userInfoRef: Observable<User>;
  public userUid: Observable<string>;
  public userCompanyId: Observable<string>;

  public uid: string;
  public email: string;
  public companyId: string;
  private loginComponent: LoginComponent;
  private loginProces: boolean = false;

  constructor(private af: AngularFire) {

    var userLoginEvent = this.af.auth.filter(authEvent => {
      if (authEvent) {

        return true;
      } else {
        return false;
      }
    }
    );

    var user: Observable<any> = userLoginEvent.switchMap(userLoginEvent =>
      <any> this.af.database.object('/users/' + userLoginEvent.uid)
    );
    var companyID = user.map((userObject: any) => userObject.company);
    this.userCompanyId = companyID;
    var userObject: Observable<User> = <Observable<User>> companyID.combineLatest(user)
      .flatMap((userInfo: any) =>
        this.af.database.object('/unternehmen/' + userInfo[0] + '/users/' + userInfo[1].uid));
    this.userUid = this.af.auth.map(authState => {
      if (authState) {
        return authState.uid;
      }
    });

    this.userInfoRef = userObject;
    userObject.subscribe((u: User) => {
      this.logedIn = !u.isDeleted;
      this.email = u.email;
              console.log('Login Event');
      if (this.loginProces){
        this.loginComponent.routeToDashboard();
        this.loginProces = false;
      }
      if (u.isDeleted) {
        this.logout();
      }

    });

    this.af.auth.filter(auth => auth == null)
      .subscribe(auth => this.logedIn = false);

    companyID.subscribe(id => this.companyId = id);

  }


  login(email: string, password: string , loginComponent: LoginComponent): Promise<string> {
    this.loginComponent = loginComponent;
    this.loginProces = true;
    return this.af.auth.login(
      { email: email, password: password })
      .then(auth => this.email = email )
      .catch(error =>
        console.log(error.error || error)
      );
  }

  createUser(email: string, password: string, role: string) {
    var authData = this.af.auth.createUser({ email, password });
    return authData.then(au => {
      const userInfo = this.af.database.object
        ('/unternehmen/' + this.companyId + '/users/' + au.uid);
      userInfo.set({
        email: email,
        isDeleted: false,
        role: role,
        uid: au.uid
      });
      const user = this.af.database.object('/users/' + au.uid);
      user.set(
        {
          role: role,
          uid: au.uid,
          company: this.companyId
        });
    });
  }


  createAdministrator(email: string, password: string, role: string){
    var authData = this.af.auth.createUser({ email, password });
    return authData.then(au => {
      const user = this.af.database.object('/users/' + au.uid);
      console.log(au.uid);
      user.set(
        {
          role: 'administrator',
          uid: au.uid,
          company: '-'
        });
        const admin = this.af.database.object('/admins/' + au.uid);
        admin.set(
          {
            role: role,
            email: email,
            uid: au.uid,
            isDeleted: false
          }
        )
    });
    
  }
 
  createANewUser(email: string, password: string, company: string): Promise<any> {
    var authData = this.af.auth.createUser({ email, password });
    return authData.then(au => {
      return this.af.auth.login({ email, password }).then(auth => {
        const user = this.af.database.object('/users/' + auth.uid);
        user.set(
          {
            company: auth.uid,
            role: 'admin',
            uid: auth.uid,
          });
        let companyNode = this.af.database.object('/unternehmen/' + auth.uid);
        companyNode.set({
          id: auth.uid,
          name: company,
          users: ''
        });
        const userInfo = this.af.database.object('/unternehmen/' + auth.uid + '/users/' + auth.uid);
        userInfo.set({
          uid: auth.uid,
          role: 'admin',
          isDeleted: false,
          email: email
        });
        const companyObjNode = this.af.database.object('/unternehmenObj/' + au.uid);
        companyObjNode.set(<CompanyObject>{
          scanRequested: 0,
          systemStatus: {
            scanErrors: 0,
            systemLoad: 0,
            scans: 0,
            systemStatus: 'install client app'
          },
          lastScan: {
            clientCountDiff: 0,
            timeStamp: ''
          }
        });
      });
    });
  }

  removeUser(user: User) {
    const userToRemove =
      this.af.database.object('/unternehmen/' + this.companyId + '/users/' + user.uid);
    userToRemove.update({
      isDeleted: true
    });
  }
  updateUser(user: User) {
    const userToUpdate =
      this.af.database.object('/unternehmen/' + this.companyId + '/users/' + user.uid);
    userToUpdate.update({
      role: user.role
    });
  }

  logout() {
    this.logedIn = false;
    this.companyId = null;
    this.loginComponent = null;
    this.email = null;
    this.userInfoRef = null;
    this.uid = null;
    this.loginComponent = null;
    this.loginProces = false;
    this.user = null;
    this.userCompanyId = null;
    this.userUid = null;
    this.af.auth.logout();
  }

  isLogedIn(): boolean {
    return this.logedIn;
  }

  resetPassword(email: string): Promise<any> {
    return new Promise((resolved, reject) => {
      var ref = new Firebase('https://furry-happiness.firebaseio.com/');
      ref.resetPassword({
        email: email
      }, (error) => {
        if (error) {
          reject(error);
        } else {
          resolved();
        }
      });
    });
    
  }

  changePassword(oldPassword: string, newPassword: string): Promise<any> {
    return new Promise((resolved, reject) => {
      var ref = new Firebase('https://furry-happiness.firebaseio.com/');
      ref.changePassword({
        email: this.email,
        oldPassword: oldPassword,
        newPassword: newPassword
      }, (error) => {
        if (error) {
          reject(error);
        } else {
          resolved();
        }
      });
    });
  }
}

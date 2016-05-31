import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState, FirebaseObjectObservable } from 'angularfire2';
import { Observable, Subject, BehaviorSubject} from 'rxjs';
//import 'rxjs/add/operator/switchMap';
//import 'rxjs/add/operator/filter';
import 'rxjs/Rx';
// import 'rxjs/add/operator/combineLatest-static';
import { User, UserRole} from './models/user';


@Injectable()
export class UserServiceService {

  private logedIn: boolean = false;
  public user: Observable<FirebaseAuthState>;
  public userInfoRef: Observable<User>;
  //public userRole: Observable<string>;
  public userUid: Observable<string>;
  public userCompanyId: Observable<string>;

  public uid: string;
  public companyId: string;
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
      <any>this.af.object("/users/" + userLoginEvent.uid)
    );
    var companyID = user.map((userObject: any) => userObject.company);
    this.userCompanyId = companyID;
    var userObject: Observable<User> = companyID.combineLatest(user)
      .flatMap((userInfo: any) => this.af.object("/unternehmen/" + userInfo[0] + "/users/" + userInfo[1].uid));
    this.userUid = userObject.map((user: User) => user.uid);

    this.userInfoRef = userObject;
    userObject.subscribe(user => this.logedIn = !user.isDeleted);

    this.af.auth.filter(auth => auth == null)
      .subscribe(auth => this.logedIn = false);

    companyID.subscribe(id => this.companyId = id);
  }


  login(email: string, password: string) {
    this.af.auth.login(
      { email: email, password: password }
    )
      .catch(error =>
        console.log(error.error || error)
      );
  }

  createUser(email: string, password: string, role: string) {
    var authData = this.af.auth.createUser({ email, password });
    return authData.then(au => {
      const userInfo = this.af.database.object("/unternehmen/" + this.companyId + "/users/" + au.uid);
      userInfo.set({
        email: email,
        isDeleted: false,
        role: role
      })
      const user = this.af.database.object("/users/" + au.uid);
      user.set(
        {
          company: this.companyId,
          uid: au.uid,
        });
    });
  }

  removeUser(user: User) {
    const userToRemove = this.af.database.object("/unternehmen/" + this.companyId + "/users/" + user.uid);
    userToRemove.update({
      isDeleted: true
    });
  }
  updateUser(user: User) {
    const userToUpdate = this.af.database.object("/unternehmen/" + this.companyId + "/users/" + user.uid);
    userToUpdate.update({
      role: user.role
    });
  }

  logout() {
    this.af.auth.logout();
  }

  isLogedIn(): boolean {
    return this.logedIn;
  }

}

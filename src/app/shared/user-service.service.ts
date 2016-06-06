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
    this.userUid = this.af.auth.map(authState => {
      if(authState) {
        return authState.uid;
      }
    });

    this.userInfoRef = userObject;
    userObject.subscribe(user => {
      this.logedIn = !user.isDeleted;
      if(user.isDeleted){
        this.logout();
      }
      
    });

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
      const userInfo = this.af.database.object
                       ("/unternehmen/" + this.companyId + "/users/" + au.uid);
      userInfo.set({
        email: email,
        isDeleted: false,
        role: role,
        uid: au.uid
      });
      const user = this.af.database.object("/users/" + au.uid);
      user.set(
        {
          role: role,
          uid: au.uid,
          company: this.companyId
        });
    });
  }
  
  
  
  createANewUser(email: string, password: string, company: string) : Promise<any>{
    var authData = this.af.auth.createUser( {email, password});
    return authData.then(au => { 
       this.af.auth.login( {email, password} );
       return authData;
    }).then(au => {
       const user = this.af.database.object('/users/' + au.uid);
      user.set(
        {
          company: au.uid,
          role: 'admin',
          uid: au.uid,
        });
  /*    const company = this.af.database.object('/unternehmen/' + au.uid);
      company.set({
          id : au.uid,
          name : 'companyName'
      });
      const userInfo = this.af.database.object('/unternehmen/' + au.uid + '/users/' + au.uid);
      userInfo.set({
          uid : au.uid,
          role : 'admin',
          isDeleted : false,
          email: email
      }); */
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

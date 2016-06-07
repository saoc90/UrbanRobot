import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import { Observable} from 'rxjs';
import 'rxjs/Rx';
import { User } from './models/user';


@Injectable()
export class UserServiceService {

  private logedIn: boolean = false;
  public user: Observable<FirebaseAuthState>;
  public userInfoRef: Observable<User>;
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
    var user: Observable<any> = userLoginEvent.switchMap(loginEvent =>
      <any>this.af.object('/users/' + loginEvent.uid)
    );
    var companyID = user.map((userObject: any) => userObject.company);
    this.userCompanyId = companyID;
    var userObject: Observable<User> = companyID.combineLatest(user)
      .flatMap((userInfo: any) =>
          this.af.object('/unternehmen/' + userInfo[0] + '/users/' + userInfo[1].uid));
    this.userUid = this.af.auth.map(authState => {
      if (authState) {
        return authState.uid;
      }
    });

    this.userInfoRef = userObject;
    userObject.subscribe(userRef => {
      this.logedIn = !userRef.isDeleted;
      if (userRef.isDeleted) {
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

  createANewUser(email: string, password: string, company: string): Promise<any>{
    var authData = this.af.auth.createUser( {email, password});
    return authData.then(au => {
       this.af.auth.login( {email, password} ).then(auth => {
       const user = this.af.database.object('/users/' + auth.uid);
      user.set(
        {
          company: auth.uid,
          role: 'admin',
          uid: auth.uid,
        });
      let companyNode = this.af.database.object('/unternehmen/' + auth.uid);
      companyNode.set({
          id : auth.uid,
          name : company
      });
      const userInfo = this.af.database.object('/unternehmen/' + auth.uid + '/users/' + auth.uid);
      userInfo.set({
          uid : auth.uid,
          role : 'admin',
          isDeleted : false,
          email: email
      });
      this.af.database.object('/unternehmenObj/' + au.uid );
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
    this.af.auth.logout();
  }

  isLogedIn(): boolean {
    return this.logedIn;
  }

}

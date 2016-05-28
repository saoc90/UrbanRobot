import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs';


@Injectable()
export class UserServiceService {

  private logedIn: boolean = false;
  public user:Observable<FirebaseAuthState>;
  public userInfoRef:FirebaseObjectObservable<any>;
  public userRole: Observable<string>;
  public userUid: Observable<string>;
  public userCompany: Observable<string>;
  public userEmail: Observable<string>;
  public uid: string;

  constructor(private af: AngularFire) {
    this.user = this.af.auth;
    this.userUid = this.af.auth.map(e => {
      if(e){
      return e.uid;
      } else {
        return null;
      }
    });
    
    this.af.auth.subscribe(e => {
        if(e){
          if(!this.logedIn){
            console.log(e);
            this.userInfoRef = this.af.object("/users/" + e.uid)
            this.userRole = this.userInfoRef.map( user =>  user.role)
            this.userCompany = this.userInfoRef.map(user => user.company)
            this.userEmail = this.userInfoRef.map(user => user.email);
            this.uid = e.uid;
          }
          this.logedIn = true;
        } else {
          this.logedIn = false;
          this.userInfoRef = null;
        }
    }, error => {
      this.logedIn = false;
      //console.log(error);
    })
  }

  
login(email: string, password: string){
   this.af.auth.login({email: email, password: password})
   .catch(error => console.log(error.error || error));
  }
  
  createUser(email: string, password: string, company: string, role: string){
    var authData  = this.af.auth.createUser({email, password});
    return authData.then(au => {
      const user = this.af.database.object("/users/" + au.uid);
      user.set(
        {
          email: email,
          company: company,
          role: role,
          uid: au.uid
        });
    });
  }
  
removeUser(){

}

  logout(){
    this.af.auth.logout();
  }

  isLogedIn(): boolean {
    return this.logedIn;
  }
}

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

  constructor(private af: AngularFire) {
    this.user = this.af.auth;
    this.userUid = this.af.auth.map(e => {
      return e.uid;
    });
    
    this.af.auth.subscribe(e => {
        
        if(e){
          if(!this.logedIn){
            console.log(e);
            this.userInfoRef = this.af.object("/users/" + e.uid)
            this.userRole = this.userInfoRef.map( user =>  user.role );
          }
          this.logedIn = true;
        } else {
          this.logedIn = false;
          this.userInfoRef = null;
        }
    }, error => {
      this.logedIn = false;
      console.log(error);
    })
  }
  
  login(email:string, password:string){
    
    var tmp =  this.af.auth.login({email: email, password: password});  
  }
  
  
  logout(){
    this.af.auth.logout();
  }
  
  isLogedIn(): boolean {
    return this.logedIn;
  }

}

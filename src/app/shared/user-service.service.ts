import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs';


@Injectable()
export class UserServiceService {

  private logedIn: boolean = false;
  public user:Observable<FirebaseAuthState>;
  public userInfoRef:FirebaseObjectObservable<any>;
  public userRole: Observable<string>; 

  constructor(private af: AngularFire) {
    this.user = this.af.auth;
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
    
    var tmp =  this.af.auth.login({email: 'jwo.nagel@gmail.com', password:'12345678'});  
  }
  
  
  logout(){
    this.af.auth.logout();
  }
  
  isLogedIn(): boolean {
    return this.logedIn;
  }

}

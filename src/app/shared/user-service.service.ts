import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import { Observable } from 'rxjs';


@Injectable()
export class UserServiceService {

  private logedIn: boolean = false;
  public user:Observable<FirebaseAuthState>;

  constructor(private af: AngularFire) {
    this.user = this.af.auth;
    this.af.auth.subscribe(e => {
        console.log(e);
        if(e){
          this.logedIn = true;
        } else {
          this.logedIn = false;
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
  
  public isLogedIn(): boolean {
    return this.logedIn;
  }

}

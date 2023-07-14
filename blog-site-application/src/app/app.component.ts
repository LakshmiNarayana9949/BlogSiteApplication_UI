import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'  
})
export class AppComponent {
  title = 'blog-site-application';
  constructor(private auth : AuthService, private router : Router){}

  ngOnInit(): void {
    if(!this.LoggedIn(true)){
      this.router.navigate(['login']);
    }
  }

  LoggedIn(input: boolean) : boolean{
    if(input){
      return this.auth.loggedIn();
    }
    else{
      return !this.auth.loggedIn();
    }
  }

  Logout(){
    this.auth.logOutUser();
    this.router.navigate(['/login']);
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoginDetails } from '../models/LoginDetails';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'  
})
export class LoginComponent implements OnInit {
  loginDetails : LoginDetails = new LoginDetails();
  constructor(private router : Router, private auth : AuthService) { }

  Login(){
    
    this.auth.loginUser(this.loginDetails).subscribe(res => {
      debugger;
    });
  }
  ngOnInit(): void {
  }

}

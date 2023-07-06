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
  errorMessage : string = ''
  eMailValidation : string = ''
  passwordValidation : string = ''
  constructor(private router : Router, private auth : AuthService) { }

  Login(){ 
    this.resetValidations(); 
    if(this.loginDetails.Email != '' && this.loginDetails.Password != '')
    {  
      this.auth.loginUser(this.loginDetails).subscribe(res => { 
        localStorage.setItem('token', res.RefreshToken);
        localStorage.setItem('userId', res.Id);    
        this.router.navigate(['/blog']);     
      },
      err => {
        this.errorMessage = err.error.text;
      });
    }
    else{
      this.validateLoginDetails();
    }
  }

  resetValidations(){
    this.eMailValidation = '';
    this.passwordValidation = ''
;  }

  validateLoginDetails(){
    if(this.loginDetails.Email == ''){
      this.eMailValidation = 'Email is required';
    }
    if(this.loginDetails.Password == ''){
      this.passwordValidation = 'Password is required';
    }
  }
  ngOnInit(): void {
  }

}

import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Component({  
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {
  message : string = ''
  errorMessage : string = ''
  userNameValidation : string = ''
  eMailValidation : string = ''
  passwordValidation : string = ''
  user : User = new User()
  constructor(private _router: Router, private _auth: AuthService) { }  

  RegisterNewUser(){ 
    this.resetValidations();
    if(this.user.UserName != '' && this.user.Email != '' && this.user.Password != '')
    {   
      if(this.user.Email.includes('@') && this.user.Email.endsWith('.com') && 
         this.user.Password.length >= 8)
      {
        this.user.Id = 0;
        this.user.UserType = 2;
        this._auth.registerUser(this.user).subscribe(res => {
          if(res == "true"){
            this.successfulRegistration();
          }
          else{
            this.failedRegistration();
          }
        });
      }
      else{
        this.validateEmailAndpasssword();
      }
    }
    else{
      this.validateRequiredFields();
    }
  }

  resetValidations(){
    this.userNameValidation = ''
    this.eMailValidation = ''
    this.passwordValidation = ''
    this.errorMessage = '';
    this.message = '';
  }

  successfulRegistration(){
    this.message = "User registered successfully";
    this.errorMessage = '';
    this.user = new User;
  }

  failedRegistration(){
    this.message = '';
    this.errorMessage = "Username or Email already exists";
  }

  validateEmailAndpasssword(){
    if(!(this.user.Email.includes('@') && this.user.Email.endsWith('.com'))){
      this.eMailValidation = 'Invalid Email';
    }
    if(this.user.Password.length < 8){
      this.passwordValidation = 'Password should be atleast 8 characters';
    }
  }

  validateRequiredFields(){
    if(this.user.UserName == ''){
      this.userNameValidation = 'Username is required';
    }
    if(this.user.Email == ''){
      this.eMailValidation = 'Email is required';
    }
    if(this.user.Password == ''){
      this.passwordValidation = 'Password is required';
    }
  }

  ngOnInit(): void {        
  }

}

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
  user : User = new User()
  constructor(private _router: Router, private _auth: AuthService) { }  

  RegisterNewUser(){    
    this.user.Id = 0;
    this._auth.registerUser(this.user).subscribe(res => {
      if(res == "true"){
        this.message = "User registered successfully";
        this.errorMessage = '';
        this.user = new User;
      }
      else{
        this.message = "";
        this.errorMessage = "Username or Email already exists";
      }
      });
  }

  ngOnInit(): void {        
  }

}

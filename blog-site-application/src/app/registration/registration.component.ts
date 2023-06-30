import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({  
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {

  constructor(private _router: Router) { }  

  ngOnInit(): void {        
  }

}

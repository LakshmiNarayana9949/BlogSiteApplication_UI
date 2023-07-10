import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { User } from "../models/User";
import { LoginDetails } from "../models/LoginDetails";

@Injectable()
export class AuthService{
    private registerURL = "https://localhost:7251/Registration/Register"; 
    private loginURL = "https://localhost:7099/Authentication/Authenticate";    

    constructor(private router : Router, private http : HttpClient){

    }

    registerUser(user: User){        
        return this.http.post(this.registerURL, user, {responseType : 'text'}); 
    }

    loginUser(loginDetails: LoginDetails){
        return this.http.post<any>(this.loginURL, loginDetails);
    }

    getToken(){
        return localStorage.getItem('token');
    }

    loggedIn(){
        return !!localStorage.getItem('token');
    }

    logOutUser(){
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.clear();
    }
}
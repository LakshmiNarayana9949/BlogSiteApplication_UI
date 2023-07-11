import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { User } from "../models/User";
import { LoginDetails } from "../models/LoginDetails";
import { Blog } from "../models/Blog";
import { Head } from "rxjs";

@Injectable()
export class AuthService{
    private registerURL = "https://localhost:7251/Registration/Register"; 
    private loginURL = "https://localhost:7099/Authentication/Authenticate";
    private blogURL = "https://localhost:7185/Blog/AddNewBlog";    

    constructor(private router : Router, private http : HttpClient){

    }

    registerUser(user: User){        
        return this.http.post(this.registerURL, user, {responseType : 'text'}); 
    }

    loginUser(loginDetails: LoginDetails){
        return this.http.post<any>(this.loginURL, loginDetails);
    }

    addNewBlog(blog : Blog){
        debugger;
        return this.http.post(this.blogURL, blog, {responseType : 'text'});
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
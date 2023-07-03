import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { User } from "../models/User";

@Injectable()
export class AuthService{
    private registerURL = "https://localhost:7251/Registration/Register";   

    constructor(private router : Router, private http : HttpClient){

    }

    registerUser(user: User){
        return this.http.post(this.registerURL, user, {responseType : 'text'}); 
    }
}
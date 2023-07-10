import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddnewblogComponent } from '../addnewblog/addnewblog.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html'
})
export class BlogComponent implements OnInit {
  loginMessage : string = ''

  constructor(private auth : AuthService, private router : Router) { }

  ngOnInit(): void {
    this.showLoginMessage();
  }
  showLoginMessage(){    
    this.loginMessage = 'Hello ' + localStorage.getItem('userName') + '. Welcome to Blog Site Application.' 
  }

  AddNewBlog(){
    this.router.navigate(['/addNewBlog']);
  }

}

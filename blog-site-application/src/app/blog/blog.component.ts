import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddnewblogComponent } from '../addnewblog/addnewblog.component';
import { AuthService } from '../services/auth.service';
import { Blog } from '../models/Blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html'
})
export class BlogComponent implements OnInit {
  loginMessage : string = ''
  blogsCount : number = 0
  blogs : Array<Blog> = new Array<Blog>()

  constructor(private auth : AuthService, private router : Router) { }

  ngOnInit(): void {
    this.showLoginMessage();
    this.showBlogsGrid();
  }
  showLoginMessage(){    
    this.loginMessage = 'Hello ' + localStorage.getItem('userName') + '. Welcome to Blog Site Application.' 
  }

  AddNewBlog(){
    this.router.navigate(['/addNewBlog']);
  }

  showBlogsGrid(){
    let userId = Number(localStorage.getItem('userId'));
    this.auth.getBlogsByUser(userId).subscribe(res => {
      this.blogs = res;
      this.blogsCount = res.length;
    })
  }

  IsBlogsAvailable() : boolean{
    return this.blogsCount > 0;
  }

  ViewBlog(id : number){
    localStorage.setItem('blogId', id.toString());
    this.router.navigate(['viewblog']);
  }

  DeleteBlog(id : number){
    this.auth.deleteBlogById(id).subscribe(res => {      
      this.reloadBlogsGrid();
    },
    err => {
      this.reloadBlogsGrid();
    })
  }

  reloadBlogsGrid(){
    this.blogs = new Array<Blog>();
    this.showBlogsGrid();
  }
}

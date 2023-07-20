import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddnewblogComponent } from '../addnewblog/addnewblog.component';
import { AuthService } from '../services/auth.service';
import { Blog } from '../models/Blog';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html'
})
export class BlogComponent implements OnInit {
  loginMessage : string = ''
  blogsCount : number = 0
  blogs : Array<Blog> = new Array<Blog>()
  category : string = ''
  fromdate : Date | null = null
  todate : Date | null = null
  blogsCountMessage : string = ''

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
      if(this.blogsCount > 0){
        this.blogsCountMessage = 'Showing ' + this.blogsCount.toString() + ' Blog(s).'
      }
      else{
        this.blogsCountMessage = 'No blogs found, click on Add New Blog button to add a new blog';
      }
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

  SearchBlogs(){    
    let userId = Number(localStorage.getItem('userId'));
    let modifiedfromdate : string = formatDate('1753-01-01', 'MM-dd-yyyy', 'en-US');
    let modifiedtodate: string = formatDate('9999-12-31', 'MM-dd-yyyy', 'en-US');
    
    if(this.fromdate != null){
      modifiedfromdate = formatDate(this.fromdate, 'MM-dd-yyyy', 'en-US');
    }
    if(this.todate != null){
      modifiedtodate = formatDate(this.todate, 'MM-dd-yyyy', 'en-US');
    }

    if(this.category == ''){
      alert('Please enter category to search Blogs');    
    }
    else{
      this.auth.SearchBlogsWithFilters(userId, this.category, modifiedfromdate, modifiedtodate).subscribe(res => {
        this.blogs = new Array<Blog>();
        this.blogs = res;
        this.blogsCount = res.length;
        if(this.blogsCount > 0){
          this.blogsCountMessage = 'Showing ' + this.blogsCount.toString() + ' Blog(s).'
        }
        else{
          this.blogsCountMessage = 'No Blogs found for the selected search criteria';
        }
      });
    }
  }

  IfUser() : boolean{
    if(localStorage.getItem('userType') == '2'){
      return true;
    }
    else{
      return false;
    }
  }

  CreatedByMe(createdBy : number) : boolean{
    if(localStorage.getItem('userId') == createdBy.toString()){
      return true;
    }
    else{
      return false;
    }
  }
}

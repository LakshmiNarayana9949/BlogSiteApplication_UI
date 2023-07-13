import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from '../models/Blog';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-viewblog',
  templateUrl: './viewblog.component.html'
})
export class ViewblogComponent implements OnInit {
  blog : Blog = new Blog();
  constructor(private auth : AuthService, private router : Router) { }

  ngOnInit(): void {
    this.viewBlog();
  }

  viewBlog(){
    var blogId = Number(localStorage.getItem('blogId'));
    this.auth.getBlogById(blogId).subscribe(res => {
      this.blog = res;
    })
  }

  GoToBlogs(){
    localStorage.removeItem('blogId');
    this.router.navigate(['blog']);
  }

}

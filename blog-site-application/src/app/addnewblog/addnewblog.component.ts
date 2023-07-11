import { Component, OnInit } from '@angular/core';
import { Blog } from '../models/Blog';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-addnewblog',
  templateUrl: './addnewblog.component.html'
})
export class AddnewblogComponent implements OnInit {

  constructor(private auth : AuthService) { }
  blog : Blog = new Blog();
  blogNameValidation : string = ''
  blogCategoryValidation : string = ''
  blogArticleValidation : string = ''
  successMessage : string = ''

  ngOnInit(): void {
  }

  AddNewBlog(){    
    this.blog.CreatedBy = Number(localStorage.getItem('userId'));
    this.auth.addNewBlog(this.blog).subscribe(res => {
      debugger;
    });
  }

}

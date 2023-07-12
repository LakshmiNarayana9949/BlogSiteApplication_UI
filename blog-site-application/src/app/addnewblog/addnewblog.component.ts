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
    this.resetValidations();
    if(this.blog.blogName != '' && this.blog.category != '' && this.blog.article != ''){
      if(this.blog.blogName.length >= 20 && this.blog.category.length >= 20 && 
                                            this.blog.article.length >= 2000){      
        this.blog.createdBy = Number(localStorage.getItem('userId'));
        this.auth.addNewBlog(this.blog).subscribe(res => {  
          debugger;
          this.successMessage = res;
          this.blog = new Blog();    
        });
      }
      else{
        this.validateLengths();
      }
    }
    else{
      this.validateRequiredFields();
    }
  }

  validateRequiredFields(){
    if(this.blog.blogName == ''){
      this.blogNameValidation = 'Blog name is required';
    }
    if(this.blog.category == ''){
      this.blogCategoryValidation = 'Category is required';
    }
    if(this.blog.article == ''){
      this.blogArticleValidation = 'Article is required';
    }
  }

  validateLengths(){
    if(this.blog.blogName.length < 20){
      this.blogNameValidation = 'Blog name should be atleast 20 characters';
    }
    if(this.blog.category.length < 20){
      this.blogCategoryValidation = 'Category should be atleast 20 characters';
    }
    if(this.blog.article.length < 2000){
      this.blogArticleValidation = 'Article  should be atleast 2000 characters';
    }
  }

  resetValidations(){
    this.blogNameValidation = '';
    this.blogCategoryValidation = '';
    this.blogArticleValidation = '';
  }
}

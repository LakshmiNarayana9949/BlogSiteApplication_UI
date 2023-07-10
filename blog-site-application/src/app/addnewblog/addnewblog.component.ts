import { Component, OnInit } from '@angular/core';
import { Blog } from '../models/Blog';

@Component({
  selector: 'app-addnewblog',
  templateUrl: './addnewblog.component.html'
})
export class AddnewblogComponent implements OnInit {

  constructor() { }
  blog : Blog = new Blog();
  blogNameValidation : string = ''
  blogCategoryValidation : string = ''
  blogArticleValidation : string = ''
  successMessage : string = ''

  ngOnInit(): void {
  }

}

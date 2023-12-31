import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RegistrationComponent } from './registration/registration.component';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { BlogComponent } from './blog/blog.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AddnewblogComponent } from './addnewblog/addnewblog.component';
import { ViewblogComponent } from './viewblog/viewblog.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    BlogComponent,
    AddnewblogComponent,
    ViewblogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, LoginComponent, BlogComponent, AddnewblogComponent,{
    provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptorService,
    multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

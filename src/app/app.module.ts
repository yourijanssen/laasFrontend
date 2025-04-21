import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './components/app.component';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { HelloComponent } from './components/hello/hello.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './services/account/auth.interceptor';
import { AboutComponent } from './components/about/about.component';
import { BookBorrowingComponent } from './components/book-borrowing/book-borrowing.component';
import { FollowCoursesComponent } from './components/follow-courses/follow-courses.component';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HelloComponent,
    NavbarComponent,
    LoginComponent,
    AboutComponent,
    BookBorrowingComponent,
    FollowCoursesComponent,
    CreateBookComponent,
    ManageUsersComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

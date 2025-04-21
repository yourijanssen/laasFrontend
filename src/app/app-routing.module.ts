import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { HelloComponent } from './components/hello/hello.component';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { BookBorrowingComponent } from './components/book-borrowing/book-borrowing.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { FollowCoursesComponent } from './components/follow-courses/follow-courses.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { CreateBookComponent } from './components/create-book/create-book.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'register', component: RegisterComponent,canActivate: [AuthGuard] },
  { path: 'home', component: HelloComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'create-book', component: CreateBookComponent, canActivate: [AuthGuard] },
  { path: 'users', component: ManageUsersComponent, canActivate: [AuthGuard] },
  { path: 'users/edit/:id', component: EditUserComponent, canActivate: [AuthGuard] },
  { path: 'borrow-books', component: BookBorrowingComponent, canActivate: [AuthGuard] },
  { path: 'follow-courses', component: FollowCoursesComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

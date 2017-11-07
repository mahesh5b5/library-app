import { MyBooksComponent } from './my-books/my-books.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { Routes } from '@angular/router';
import { Error404Component } from './error404/error404.component';
import { HomeComponent } from './home/home.component';
export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent, data: { title: 'My Calendar' } },
  { path: 'new-book', component: CreateBookComponent },
  { path: 'my-books', component: MyBooksComponent },
  { path: 'book-details/:id', component: BookDetailComponent },
  { path: '404', component: Error404Component },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'user', loadChildren: './user/user.module#UserModule' }
];


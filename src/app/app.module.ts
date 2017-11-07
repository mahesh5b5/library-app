import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UserService } from './services/user.service';
import { appRoutes } from './routes';
import { RouterModule } from '@angular/router';
import { Error404Component } from './error404/error404.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { LibraryService } from './services/library.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BooksComponent } from './books/books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { Angular2SocialLoginModule } from 'angular2-social-login';
const providers = {
  'google': {
    'clientId': '357074255007-7sjgsjq98ctmjb5f46llsofbh49h5cia.apps.googleusercontent.com'
  },
  'facebook': {
    'clientId': '179525502601808',
    'apiVersion': 'v2.10'
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    Error404Component,
    FooterComponent,
    BooksComponent,
    BookDetailComponent,
    CreateBookComponent,
    MyBooksComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    Angular2SocialLoginModule,
    RouterModule.forRoot(appRoutes),
    MDBBootstrapModule.forRoot()
  ],
  providers: [LibraryService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule { }
// Social login
Angular2SocialLoginModule.loadProvidersScripts(providers);

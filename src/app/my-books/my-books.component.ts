import { Title } from '@angular/platform-browser';
import { IBook } from '../interfaces/IBook';
import { UserService } from '../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss']
})
export class MyBooksComponent implements OnInit {
  myBooks = [];
  constructor(private userService: UserService, private titleService: Title) { }
  ngOnInit() {
    this.titleService.setTitle('My Books');
    this.getUserDetails();
  }
  getUserDetails() {
    this.userService.getUserById(localStorage.userId).subscribe(data => {
      console.log(data[0].my_books);
      this.myBooks = data[0].my_books;
    }, err => {
      console.log(err);
    });
  }
}

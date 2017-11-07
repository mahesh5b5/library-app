import { UserService } from '../services/user.service';
import { LibraryService } from '../services/library.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  book: any;
  userData: any;
  comment = '';
  is_book_liked = false;
  is_added_self = false;
  currentUser = localStorage.userId;
  constructor(private route: ActivatedRoute, private titleService: Title,
    private libraryService: LibraryService, private userService: UserService) { }

  ngOnInit() {
    this.getUserData();
    this.getBookDetails();
  }
  getBookDetails() {
    this.libraryService.getBookById(this.route.snapshot.params['id']).subscribe(data => {
      // console.log(data);
      this.book = data;
      this.titleService.setTitle(this.book.title);
    });
  }
  getUserData() {
    this.userService.getUserById(localStorage.userId).subscribe(data => {
      this.userData = data[0];
      for (const bookId of this.userData.liked_books) {
        if (this.route.snapshot.params['id'] === bookId) {
          this.is_book_liked = true;
        }
      }
      for (const book of this.userData.my_books) {
        if (this.route.snapshot.params['id'] === book.id) {
          this.is_added_self = true;
        }
      }
    });
  }
  addComment(formData, bookId) {
    console.log(formData);
    formData.added = new Date();
    formData.user = this.currentUser;
    this.book.comments.push(formData);
    this.libraryService.updateBookData({ comments: this.book.comments }, bookId).subscribe(res => {
      console.log(res);
      this.comment = '';
    }, err => {
      console.log(err);
    });
  }
  likeBook(book) {
    // Adding book id to user details
    this.userData.liked_books.push(book.id);
    const likedObj = {
      liked_books: this.userData.liked_books
    };
    this.userService.updateUser(likedObj, localStorage.userId).subscribe(res => {
      // console.log(res);
      this.is_book_liked = true;
      this.getUserData();
    }, err => {
      // console.log(err);
    });
  }
  unlikeBook(book) {
    // Deleting book id to user details
    for (let i = 0; i < this.userData.liked_books.length; i++) {
      if (book.id === this.userData.liked_books[i]) {
        this.userData.liked_books.splice(i, 1);
      }
    }
    const likedObj = {
      liked_books: this.userData.liked_books
    };
    this.userService.updateUser(likedObj, localStorage.userId).subscribe(res => {
      // console.log(res);
      this.is_book_liked = false;
      this.getBookDetails();
      this.getUserData();
    }, err => {
      // console.log(err);
    });
  }
  addToSelf(book) {
    // Adding book id to user details
    this.userData.my_books.push(book);
    const selfObj = {
      my_books: this.userData.my_books
    };
    this.userService.updateUser(selfObj, localStorage.userId).subscribe(res => {
      // console.log(res);
      this.is_added_self = true;
      this.getUserData();
    }, err => {
      // console.log(err);
    });
  }
  removeFromSelf(book) {
    // Deleting book id to user details
    for (let i = 0; i < this.userData.my_books.length; i++) {
      if (book.id === this.userData.my_books[i].id) {
        this.userData.my_books.splice(i, 1);
      }
    }
    const selfObj = {
      my_books: this.userData.my_books
    };
    this.userService.updateUser(selfObj, localStorage.userId).subscribe(res => {
      // console.log(res);
      this.is_added_self = false;
      this.getUserData();
    }, err => {
      // console.log(err);
    });
  }
}

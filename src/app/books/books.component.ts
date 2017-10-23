import { Router } from '@angular/router';
import { IBook } from '../interfaces/IBook';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  addedSelf = false;
  @Input() book: any;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  viewDetails(id) {
    this.router.navigate(['/book-details', id]);
  }

  addBookToSelf(book) {
    console.log(book);
    this.addedSelf = !this.addedSelf;
  }
}

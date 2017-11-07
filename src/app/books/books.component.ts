import { LibraryService } from '../services/library.service';
import { Router } from '@angular/router';
import { IBook } from '../interfaces/IBook';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  addedSelf = false;
  @Input() book: any;
  @Input() delete: boolean;
  @Output() deleted: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private libraryService: LibraryService) { }

  ngOnInit() {
  }

  viewDetails(id) {
    this.router.navigate(['/book-details', id]);
  }
  deleteBook(id) {
    this.libraryService.deleteBookById(id).subscribe(res => {
      console.log(res);
      this.deleted.emit(true);
    }, err => {
      console.log(err);
    });
  }
  addBookToSelf(book) {
    console.log(book);
    this.addedSelf = !this.addedSelf;
  }
}

import { LibraryService } from '../services/library.service';
import { Component, OnInit } from '@angular/core';
import { IBook } from '../interfaces/IBook';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  bookList;

  constructor(private libraryService: LibraryService) { }

  ngOnInit() {
    this.bookList = this.libraryService.getAllBooks().subscribe(data => {
      this.bookList = data;
      console.log(this.bookList);
    });
  }
}

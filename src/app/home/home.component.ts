import { LibraryService } from '../services/library.service';
import { Component, OnInit } from '@angular/core';
import { IBook } from '../interfaces/IBook';
import { Title } from '@angular/platform-browser';
import * as _ from 'lodash';
@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  bookList;
  filteredBookList = [];
  subjectsList = [];
  selectedGenre = '';
  toggleDelete = false;
  showDelete = false;
  constructor(private libraryService: LibraryService, private titleService: Title) { }

  ngOnInit() {
    if (localStorage.hasOwnProperty('is_admin')) {
      if (localStorage.is_admin === 'true') {
        this.showDelete = true;
      }
    }
    this.titleService.setTitle('Dashboard');
    this.getAllBooks();
  }
  subjectChanged() {
    console.log(this.selectedGenre);
    if (this.selectedGenre === '') {
      this.filteredBookList = this.bookList;
    } else {
      this.filteredBookList = _.filter(this.bookList, { genre: this.selectedGenre });
    }
  }
  
  getAllBooks() {
    this.bookList = this.libraryService.getAllBooks().subscribe(data => {
      this.bookList = data;
      this.filteredBookList = this.bookList;
      for (const book of this.bookList) {
        this.subjectsList.push(book.genre);
      }
      this.subjectsList = _.uniq(this.subjectsList);
      console.log(this.bookList);
    });
  }

  onDeleteBook(e) {
    this.getAllBooks();
  }
}

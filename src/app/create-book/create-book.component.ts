import { LibraryService } from '../services/library.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {
  newBook;
  toggleNewBookInfo = false;
  constructor(private libraryService: LibraryService) { }
  search: string;
  ngOnInit() {
  }
  addBookIsbn(formData) {
    console.log(formData);
    if (formData.isbn) {
      this.libraryService.addBookIsbn(formData.isbn).subscribe(data => {
        console.log(data);
        if (data.totalItems) {
          const bookData = data.items[0].volumeInfo;
          this.newBook = {
            author: bookData.authors.join(', '),
            title: bookData.title,
            imageUrl: bookData.imageLinks.thumbnail,
            genre: bookData.categories.join(', '),
            isbn: bookData.industryIdentifiers[0].identifier,
            id: bookData.industryIdentifiers[0].identifier,
            likes_count: '',
            description: bookData.description,
            comments: [],
            comments_count: '',
            averageRating: bookData.averageRating,
            language: bookData.language,
            pageCount: bookData.pageCount,
            subtitle: bookData.subtitle,
            previewLink: bookData.previewLink,
            publishedDate: bookData.publishedDate,
            publisher: bookData.publisher,
            ratingsCount: bookData.ratingsCount
          };
          console.log(this.newBook);
          this.toggleNewBookInfo = true;
        } else {
          alert('Error: Book not found!');
        }
      });
    }
  }

  saveIsbnBook() {
    this.libraryService.addBookData(this.newBook).subscribe(res => {
      console.log(res);
      alert('Book added successfully');
      this.search = '';
      this.toggleNewBookInfo = false;
      this.newBook = {};
    }, err => {
      alert('Error: Book already exists!');
      this.search = '';
      this.newBook = {};
      this.toggleNewBookInfo = false;
    });
  }
  cancelIsbnBook() {
    this.newBook = {};
    this.search = '';
    this.toggleNewBookInfo = false;
  }
}

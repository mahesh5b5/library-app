import { LibraryService } from '../services/library.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

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
          const newBook = {
            author: bookData.authors[0],
            title: bookData.title,
            imageUrl: bookData.imageLinks.thumbnail,
            genre: bookData.categories.join(', '),
            isbn: bookData.industryIdentifiers[0].identifier,
            id: bookData.industryIdentifiers[0].identifier,
            likes_count: '',
            description: bookData.description,
            comments: [],
            comments_count: ''
          };
          console.log(newBook);
          this.libraryService.addBookData(newBook).subscribe(res => {
            console.log(res);
            alert('Book added successfully');
            this.search = '';
          }, err => {
            alert('Error: Book already exists!');
            this.search = '';
          });
        } else {
          alert('Error: Book not found!');
        }
      });
    }
  }
}

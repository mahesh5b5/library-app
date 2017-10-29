import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LibraryService } from '../services/library.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {
  newBook;
  private addManualForm: FormGroup;
  private title: FormControl;
  private subtitle: FormControl;
  private isbn: FormControl;
  private description: FormControl;
  private genre: FormControl;
  private language: FormControl;
  private publishedDate: FormControl;
  private imageUrl: FormControl;
  private publisher: FormControl;
  private author: FormControl;

  toggleNewBookInfo = false;
  constructor(private libraryService: LibraryService) { }
  search: string;
  ngOnInit() {
    this.title = new FormControl('', [Validators.required]);
    this.subtitle = new FormControl('');
    this.author = new FormControl('', [Validators.required]);
    this.imageUrl = new FormControl('', [Validators.required]);
    this.description = new FormControl('', [Validators.required]);
    this.publishedDate = new FormControl('');
    this.publisher = new FormControl('');
    this.genre = new FormControl('', [Validators.required]);
    this.language = new FormControl('');
    this.isbn = new FormControl('', [Validators.required]);

    this.addManualForm = new FormGroup({
      title: this.title,
      subtitle: this.subtitle,
      imageUrl: this.imageUrl,
      author: this.author,
      description: this.description,
      publisher: this.publisher,
      publishedDate: this.publishedDate,
      genre: this.genre,
      language: this.language,
      isbn: this.isbn
    });
  }
  // Validations
  validateTitle() {
    return this.title.valid || this.title.untouched;
  }
  validateAuthor() {
    return this.author.valid || this.author.untouched;
  }
  validateIsbn() {
    return this.isbn.valid || this.isbn.untouched;
  }
  validateImageUrl() {
    return this.imageUrl.valid || this.imageUrl.untouched;
  }
  validateDescription() {
    return this.description.valid || this.description.untouched;
  }
  validateGenre() {
    return this.genre.valid || this.genre.untouched;
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
            ratingsCount: bookData.ratingsCount,
            added_date: new Date(),
          };
          console.log(this.newBook);
          this.toggleNewBookInfo = true;
        } else {
          alert('Error: Book not found!');
        }
      });
    }
  }

  addBookManual(formData) {
    if (this.addManualForm.valid) {
      formData.id = formData.isbn;
      formData.added_date = new Date();
      formData.likes_count = '';
      formData.comments = [];
      formData.comments_count = '';
      formData.averageRating = '';
      formData.pageCount = '';
      formData.previewLink = '';
      formData.ratingsCount = '';
      console.log(formData);
      this.libraryService.addBookData(formData).subscribe(res => {
        console.log(res);
        alert('Book added successfully');
      }, err => {
        alert('Error: Book already exists!');
      });
    } else {
      alert('Please check the missing fields and try again!');
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

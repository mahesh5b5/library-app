import { IBook } from '../interfaces/IBook';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LibraryService {

  baseUrl = 'http://localhost:3000/';

  constructor(private http: Http) { }

  getAllBooks(): Observable<IBook[]> {
    return this.http.get('http://localhost:3000/books').map((response: Response) => {
      return <IBook[]>response.json();
    }).catch(this.handleError);
  }
  getBookById(id) {
    return this.http.get('http://localhost:3000/books/' + id).map((response: Response) => {
      return <IBook>response.json();
    }).catch(this.handleError);
  }
  addBookIsbn(isbn) {
    return this.http.get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn).map((response: Response) => {
      return response.json();
    }).catch(this.handleError);
  }
  addBookData(data): Observable<IBook[]> {
    return this.http.post('http://localhost:3000/books', data).map((response: Response) => {
      return response.json();
    }).catch(this.handleError);
  }
  private handleError(error: Response) {
    return Observable.throw(error.status);
  }
}

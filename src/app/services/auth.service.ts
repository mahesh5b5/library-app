import { Router } from '@angular/router';
import { IUser } from '../interfaces/IUser';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthService {

  userSession = false;
  baseUrl = 'http://localhost:3000/';

  constructor(private http: Http, private router: Router) { }

  userLogin(data): Observable<IUser[]> {
    return this.http.get('http://localhost:3000/users?username=' + data.username + '&password=' + data.password)
      .map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  }

  createUser(data): Observable<IUser> {
    return this.http.post('http://localhost:3000/users', data).map((response: Response) => {
      return response.json();
    }).catch(this.handleError);
  }
  updateUser(data, id): Observable<IUser> {
    return this.http.patch('http://localhost:3000/users/' + id, data).map((response: Response) => {
      return response.json();
    }).catch(this.handleError);
  }
  closeSession() {
    localStorage.clear();
    alert('User logged out successfully!');
    this.router.navigateByUrl('/user/login');
  }
  isLoggedIn() {
    const loggedIn = { admin: false, session: false };
    if (localStorage.hasOwnProperty('is_admin')) {
      loggedIn.admin = localStorage.is_admin;
      loggedIn.session = true;
      return loggedIn;
    } else {
      loggedIn.admin = false;
      loggedIn.session = false;
      return loggedIn;
    }
  }
  private handleError(error: Response) {
    return Observable.throw(error.status);
  }


}

import { AuthService } from 'angular2-social-login/dist/auth.service';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/IUser';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  baseUrl = 'http://localhost:3000/';

  constructor(private http: Http, private router: Router, private social: AuthService) { }

  userLogin(data): Observable<IUser[]> {
    return this.http.get('http://localhost:3000/users?username=' + data.username + '&password=' + data.password)
      .map((response: Response) => {
        return response.json();
      }).catch(this.handleError);
  }

  getUserById(username): Observable<IUser[]> {
    return this.http.get('http://localhost:3000/users?username=' + username)
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
    try {
      this.social.logout().subscribe(
        (data) => {
          console.log(data);
        });
    } catch (e) {
      console.log('social err', e);
    }

    alert('User logged out successfully!');
    this.router.navigateByUrl('/user/login');
  }
  isLoggedIn() {
    const loggedIn = { admin: false, userId: false, session: false };
    if (localStorage.hasOwnProperty('userId')) {
      if (localStorage.hasOwnProperty('is_admin')) {
        loggedIn.admin = localStorage.is_admin;
      }
      loggedIn.userId = localStorage.userId;
      loggedIn.session = true;
    }
    return loggedIn;
  }
  private handleError(error: Response) {
    return Observable.throw(error.status);
  }
}

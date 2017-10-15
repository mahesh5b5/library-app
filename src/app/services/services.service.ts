import { Injectable } from '@angular/core';

@Injectable()
export class ServicesService {

  userSession = false;
  baseUrl = 'http://localhost:3000/';

  constructor() { }

  userLogin() {

  }
  createUser() {

  }
  getAllBooks() {

  }
  createSession() {
    this.userSession = true;
  }

  cancelSession() {
    this.userSession = false;
  }
  checkSession() {
    if (this.userSession) {
      return true;
    } else {
      return false;
    }
  }
}

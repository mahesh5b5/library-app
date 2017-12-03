import { AuthService } from 'angular2-social-login/dist/auth.service';
// import { Injectable } from '@angular/core';
import { async, inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
  Http, HttpModule, XHRBackend, ResponseOptions,
  Response, BaseRequestOptions
} from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuComponent } from './menu/menu.component';
import { AppComponent } from './app.component';
import { UserService } from './services/user.service';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, MenuComponent
      ],
      providers: [
        {
          provide: Http, useFactory: (backend, options) => {
            return new Http(backend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        UserService,
        BaseRequestOptions,
        AuthService
      ],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));
});

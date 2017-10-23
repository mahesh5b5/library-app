import { Router, Route } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goRegister() {
    this.router.navigateByUrl('/user/register');
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }
}

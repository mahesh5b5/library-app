import { AuthService } from 'angular2-social-login/dist/auth.service';
import { Title } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/IUser';
import { Router, Route } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  socialUserData: any;
  loginForm: FormGroup;
  private username: FormControl;
  private password: FormControl;
  constructor(private router: Router, private userService: UserService, private title: Title, private social: AuthService) { }

  ngOnInit() {
    this.title.setTitle('Login');
    this.password = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]);
    this.username = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]);
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  // Validations
  validatePassword() {
    return this.password.valid || this.password.untouched;
  }

  validateUsername() {
    return this.username.valid || this.username.untouched;
  }
  socialLogin(provider) {
    this.social.login(provider).subscribe(data => {
      if (data) {
        console.log(data);
        this.socialUserData = data;
      }
      const socialName = this.socialUserData.name.replace(' ', '') + this.socialUserData.provider;
      console.log(socialName);
      this.userService.getUserById(socialName).subscribe(res => {
        console.log(res.length);
        if (res.length) {
          localStorage.userId = res[0].id;
          localStorage.is_admin = res[0].is_admin;
          this.router.navigateByUrl('/home');
        } else {
          const socialUserCreate = {
            id: socialName,
            fullname: this.socialUserData.fullname,
            username: socialName,
            password: '',
            is_admin: false,
            created: new Date(),
            my_books: [],
            liked_books: []
          };
          this.userService.createUser(socialUserCreate).subscribe(createdRes => {
            console.log(createdRes);
            localStorage.userId = createdRes.id;
            localStorage.is_admin = createdRes.is_admin;
            this.router.navigateByUrl('/home');
          }, err => {
            console.log(err);
          });
        }
      });
    }, err => {
      console.log('social eror', err);
    });
  }
  login(formData) {
    if (this.loginForm.valid) {
      this.userService.userLogin(formData).subscribe(res => {
        if (res.length) {
          delete res[0].password;
          localStorage.userId = res[0].id;
          localStorage.is_admin = res[0].is_admin;
          this.router.navigateByUrl('/home');
        } else {
          alert('Error: User does not exits');
        }
      }, err => {
        alert('Error: ' + err);
      });
    } else {
      alert('Please login details and try again!');
    }
  }
  goRegister() {
    this.router.navigateByUrl('/user/register');
  }
}

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/IUser';
import { Router, Route } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private username: FormControl;
  private password: FormControl;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
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

  login(formData) {
    if (this.loginForm.valid) {
      this.authService.userLogin(formData).subscribe(res => {
        if (res.length) {
          delete res[0].password;
          localStorage.userDetails = JSON.stringify(res[0]);
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

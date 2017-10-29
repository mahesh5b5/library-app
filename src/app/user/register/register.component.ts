import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/IUser';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  private username: FormControl;
  private fullname: FormControl;
  private password: FormControl;
  private is_admin: FormControl;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.fullname = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.username = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]);
    this.is_admin = new FormControl(false, Validators.required);

    this.registerForm = new FormGroup({
      id: this.username,
      fullname: this.fullname,
      username: this.username,
      password: this.password,
      is_admin: this.is_admin
    });
  }
  // Form validations
  validateFullname() {
    return this.fullname.valid || this.fullname.untouched;
  }
  validatePassword() {
    return this.password.valid || this.password.untouched;
  }

  validateUsername() {
    return this.username.valid || this.username.untouched;
  }

  register(formData: IUser) {
    if (this.registerForm.valid) {
      formData.created = new Date();
      formData.my_books = [];
      this.authService.createUser(formData).subscribe(res => {
        // console.log(res);
        if (res) {
          alert('Registered successfully!');
          this.router.navigateByUrl('/user/login');
        }
      }, err => {
        alert('Error: Username already Exists. Please try again!');
      });
    } else {
      alert('Make sure all the fields are valid and try again!');
    }
  }
  goLogin() {
    this.router.navigateByUrl('/user/login');
  }
}

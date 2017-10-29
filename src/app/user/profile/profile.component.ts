import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  private userData: any;
  private username: FormControl;
  private fullname: FormControl;
  private password: FormControl;
  private is_admin: FormControl;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    if (localStorage.hasOwnProperty('userDetails')) {
      this.userData = JSON.parse(localStorage.userDetails);
    } else {
      alert('Some error has occured. Please sign in!');
      localStorage.clear();
      this.router.navigateByUrl('/user/login');
    }
    this.username = new FormControl({ value: this.userData.username, disabled: true });
    this.fullname = new FormControl(this.userData.fullname, [Validators.required, Validators.minLength(2)]);
    this.password = new FormControl('', [Validators.minLength(4), Validators.maxLength(8)]);
    this.is_admin = new FormControl(this.userData.is_admin, Validators.required);

    this.profileForm = new FormGroup({
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

  saveProfile(formData) {
    if (formData.password === '') {
      delete formData.password;
    }
    console.log(formData, this.username.value);
    if (this.profileForm.valid) {
      this.authService.updateUser(formData, this.username.value).subscribe(res => {
        console.log(res);
        if (res) {
          localStorage.userDetails = JSON.stringify(res);
          localStorage.is_admin = res.is_admin;
          alert('Updated successfully!');
          this.router.navigateByUrl('/home');
        }
      }, err => {
        alert('Error: Please try again!' + err);
      });
    } else {
      alert('Make sure all the fields are valid and try again!');
    }
  }
}

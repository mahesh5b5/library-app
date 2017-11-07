import { Title } from '@angular/platform-browser';
import { UserService } from '../../services/user.service';
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
  constructor(private router: Router, private userService: UserService, private title: Title) { }

  ngOnInit() {
    this.title.setTitle('My Profile');
    this.getUserData();
    this.username = new FormControl({ value: '', disabled: true });
    this.fullname = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.password = new FormControl('', [Validators.minLength(4), Validators.maxLength(8)]);
    this.is_admin = new FormControl('', Validators.required);

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
  getUserData() {
    if (localStorage.hasOwnProperty('userId')) {
      this.userService.getUserById(localStorage.userId).subscribe(res => {
        console.log(res);
        this.userData = res[0];
        this.profileForm.controls['username'].patchValue(this.userData.username);
        this.profileForm.controls['fullname'].patchValue(this.userData.fullname);
        this.profileForm.controls['is_admin'].patchValue(this.userData.is_admin);
      }, err => {
        alert('Some error has occured. Please sign in!');
        localStorage.clear();
        this.router.navigateByUrl('/user/login');
      });
    } else {
      alert('Some error has occured. Please sign in!');
      localStorage.clear();
      this.router.navigateByUrl('/user/login');
    }
  }
  saveProfile(formData) {
    if (formData.password === '') {
      delete formData.password;
    }
    console.log(formData, this.username.value);
    if (this.profileForm.valid) {
      this.userService.updateUser(formData, this.username.value).subscribe(res => {
        console.log(res);
        if (res) {
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

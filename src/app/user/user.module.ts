import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutes } from './userRoutes';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(UserRoutes)
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ]
})
export class UserModule { }

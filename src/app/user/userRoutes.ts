import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const userRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'regiser', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent }
];

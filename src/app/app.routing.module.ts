import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
        {
                path: 'register',
                component: RegisterComponent,
                data: { title: 'Register | Library' }
        },
        {
                path: 'login',
                component: LoginComponent,
                data: { title: 'Login | Library' }
        },
        {
                path: '',
                redirectTo: '/login',
                pathMatch: 'full'
        }
        // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
        imports: [RouterModule.forRoot(appRoutes)],
        exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [RegisterComponent, LoginComponent];

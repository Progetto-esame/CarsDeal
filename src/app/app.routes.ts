import { Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path : '', redirectTo: '/home', pathMatch: 'full'},
    {path : 'login', component: LoginFormComponent},
    {path : 'registration', component: RegistrationFormComponent},
    {path : 'home', component: HomeComponent}
];

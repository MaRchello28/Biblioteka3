import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ShowBooksComponent } from './components/show-books/show-books.component';
import { LoginLabelComponent } from './components/login-label/login-label.component';
import { UserSiteComponent } from './components/user-site/user-site.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home-page', pathMatch: 'full' },
    { path: 'home-page', component: HomePageComponent },
    { path: 'show-books', component: ShowBooksComponent },
    { path: 'login', component: LoginLabelComponent},
    { path: 'user-site', component: UserSiteComponent},
];

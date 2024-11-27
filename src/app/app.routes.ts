import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ShowBooksComponent } from './components/show-books/show-books.component';

export const routes: Routes = [
    { path: 'home-page', component: HomePageComponent },
    { path: 'show-books', component: ShowBooksComponent },
];

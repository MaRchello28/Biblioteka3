import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ShowBooksComponent } from './show-books/show-books.component';

export const routes: Routes = [
    { path: 'home-page', component: HomePageComponent },
    { path: 'show-books', component: ShowBooksComponent },
];

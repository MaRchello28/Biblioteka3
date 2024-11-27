import { Component } from '@angular/core';
import { ShowBooksComponent } from './show-books/show-books.component';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [ShowBooksComponent, RouterOutlet, RouterLink, RouterLinkActive]
})
export class AppComponent {
  title = 'Biblioteka3';
}

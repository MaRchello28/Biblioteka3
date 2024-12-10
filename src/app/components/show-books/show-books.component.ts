import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-show-books',
  standalone: true,
  templateUrl: './show-books.component.html',
  styleUrls: ['./show-books.component.css'],
  imports: [CommonModule]
})
export class ShowBooksComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookservice: BookService) { }

  ngOnInit(): void {
    this.bookservice.getBooks().subscribe((books: Book[]) => {
      this.books = books;
    });
  }
}

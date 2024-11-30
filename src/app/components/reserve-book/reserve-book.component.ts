import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reserve-book',
  templateUrl: './reserve-book.component.html',
  styleUrls: ['./reserve-book.component.css'],
  imports: [CommonModule]
})
export class ReserveBookComponent implements OnInit {
  books: Book[] = [];
  sortProperty: keyof Book = 'title';
  sortDirection: 'asc' | 'desc' = 'asc';
  isReserveBookVisible = true;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.books = this.bookService.books;
  }

  sortBooks(property: keyof Book): void {
    if (this.sortProperty === property) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortProperty = property;
      this.sortDirection = 'asc';
    }
    const isNumber = typeof this.books[0][property] === 'number';
    this.bookService.sortBooks(this.sortProperty, this.sortDirection === 'asc', isNumber);
    this.books = [...this.bookService.books];
  }

  private isAscending(property: keyof Book): boolean {
    return this.sortDirection === 'asc';

  }
  reserveBook(book: Book): void {
    book.isAvailable = false;

    this.bookService.updateBook(book);

    alert(`${book.title} została zarezerwowana.`);
  }
}

import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { Reservation } from '../../models/reservation.model';
import { ReservationService } from '../../services/reservation.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reserve-book',
  templateUrl: './reserve-book.component.html',
  styleUrls: ['./reserve-book.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ReserveBookComponent implements OnInit {
  books: Book[] = [];
  reservations: Reservation[] = [];
  sortProperty: keyof Book = 'title';
  sortDirection: 'asc' | 'desc' = 'asc';
  isReserveBookVisible = true;
  filteredBooks: Book[] = [];
  searchQuery: string = '';

  constructor(public bookService: BookService, public reservationService: ReservationService) {}

  ngOnInit(): void {
    this.books = this.bookService.books; this.reservations = this.reservationService.getReservations();
    this.reservations = this.reservationService.getReservations();
  }

  canReserveBook(): boolean {
    return this.reservationService.canReserveBook();
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

  reserveBook(bookId: number): void {
    if (this.canReserveBook()) {
      this.reservationService.reserveBook(bookId);
      this.reservations = this.reservationService.getReservations();
    } else {
      alert('Nie możesz zarezerwować więcej niż 4 książek.');
    }
  }

  isBookReserved(bookId: number): boolean {
    return this.reservations.some(reservation => reservation.bookId === bookId);
  }

  cancelReservation(reservationId: number): void {
    this.reservationService.cancelReservation(reservationId);
    this.reservations = this.reservationService.getReservations();
  }

  getBookById(bookId: number): Book | undefined {
    return this.books.find(book => book.bookId === bookId);
  }

  filterBooks(): void {
    this.filteredBooks = this.books.filter(book => {
      const query = this.searchQuery.toLowerCase();
      return (
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.genre.toLowerCase().includes(query)
      );
    });
  }

  getFilteredBooks(): Book[] {
    return this.books.filter(book => 
      book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      book.genre.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}

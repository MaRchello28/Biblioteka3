import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { ReservationService } from '../../services/reservation.service';
import { LoanService } from '../../services/loan.service';  // Zaimportuj serwis LoanService
import { Reservation } from '../../models/reservation.model';
import { CommonModule } from '@angular/common';
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

  constructor(
    public bookService: BookService, 
    public reservationService: ReservationService, 
    public loanService: LoanService  // Inicjalizuj serwis LoanService
  ) {}

  ngOnInit(): void {
    this.books = this.bookService.books;
    this.reservations = this.reservationService.getReservations();
  }

  canReserveBook(bookId: number): boolean {
    // Sprawdź, czy użytkownik ma mniej niż 4 rezerwacje
    const canReserve = this.reservationService.canReserveBook();
    if (!canReserve) return false;  // Użytkownik nie może mieć więcej niż 4 rezerwacje
  
    // Sprawdź, czy książka jest wypożyczona
    const isBookLoaned = this.loanService.isBookLoaned(bookId);
    if (isBookLoaned) {
      return false; // Jeśli książka jest wypożyczona, nie można jej zarezerwować
    }
  
    // Sprawdź, czy książka jest już zarezerwowana
    const isBookReserved = this.isBookReserved(bookId);
    if (isBookReserved) {
      return false; // Jeśli książka jest zarezerwowana, nie można jej ponownie zarezerwować
    }
  
    // Jeśli wszystkie warunki są spełnione, książka może być zarezerwowana
    return true;
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

  reserveBook(bookId: number): void {
    if (this.canReserveBook(bookId)) {
      this.reservationService.reserveBook(bookId);
      this.reservations = this.reservationService.getReservations();
    } else {
      alert('Nie możesz zarezerwować tej książki.');
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

  getFilteredBooks(): Book[] {
    return this.books.filter(book => 
      book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      book.genre.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}

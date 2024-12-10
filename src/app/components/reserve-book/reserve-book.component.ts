import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { ReservationService } from '../../services/reservation.service';
import { LoanService } from '../../services/loan.service';
import { Reservation } from '../../models/reservation.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Loan } from '../../models/loan.model';

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
    private bookService: BookService, 
    private reservationService: ReservationService, 
    private loanService: LoanService
  ) {}

  ngOnInit(): void {
    this.loadBooks();
    this.loadReservations();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
      this.filteredBooks = books;
    });
  }

  loadReservations(): void {
    this.reservationService.getReservations().subscribe(reservations => {
      this.reservations = reservations;
    });
  }

  canReserveBook(bookId: number): boolean {
    const canReserve = this.reservationService.getReservations().subscribe(reservations => {
      return reservations.length < 4;
    });
    if (!canReserve) return false;

    const isBookLoaned = this.loanService.isBookLoaned(bookId);
    if (isBookLoaned) {
      return false;
    }

    const isBookReserved = this.isBookReserved(bookId);
    if (isBookReserved) {
      return false;
    }

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
    this.bookService.sortBooks(this.sortProperty, this.sortDirection === 'asc').subscribe(books => {
      this.books = books;
    });
  }

  sortLoans(property: keyof Loan): void {
    this.loanService.sortLoans(property, this.sortDirection === 'asc').subscribe(loans => {
    });
  }

  reserveBook(bookId: number): void {
    if (this.canReserveBook(bookId)) {
      const newReservation: Reservation = { bookId: bookId, userId: 1, reservationDate: new Date() } as Reservation;
      this.reservationService.addReservation(newReservation).subscribe(() => {
        this.loadReservations();
      });
    } else {
      alert('Nie możesz zarezerwować tej książki.');
    }
  }

  isBookReserved(bookId: number): boolean {
    return this.reservations.some(reservation => reservation.bookId === bookId);
  }

  cancelReservation(reservationId: number): void {
    this.reservationService.cancelReservation(reservationId).subscribe(() => {
      this.loadReservations();
    });
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

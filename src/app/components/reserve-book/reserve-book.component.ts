import { Component, Input, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../models/reservation.model';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { LoanService } from '../../services/loan.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-reserve-book',
  templateUrl: './reserve-book.component.html',
  styleUrls: ['./reserve-book.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ReserveBookComponent implements OnInit {
  @Input() currentUser: User | null = null;
  books: Book[] = [];
  reservations: Reservation[] = [];
  sortProperty: keyof Book = 'title';
  sortDirection: 'asc' | 'desc' = 'asc';
  filteredBooks: Book[] = [];
  searchQuery: string = '';

  constructor(
    private bookService: BookService, 
    private reservationService: ReservationService, 
    public loanService: LoanService
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
      this.reservations = reservations.filter(reservation => reservation.userId === this.currentUser?._id);
      const userReservationsCount = this.reservations.length;
    });
  }

  canReserveBook(_id: string): boolean {
    const isBookLoaned = this.isBookLoaned(_id);
    const isBookReserved = this.isBookReserved(_id);
    const userReservationsCount = this.reservations.filter(reservation => reservation.userId === this.currentUser?._id).length;
    const isLimitReached = userReservationsCount >= 4;
    
    return !isBookLoaned && !isBookReserved && !isLimitReached;
  }

  reserveBook(_id: string): void {
    const book = this.books.find(b => b._id === _id);
    if (!book || !book.isAvailable) {
      alert('Książka jest niedostępna do rezerwacji.');
      return;
    }

    const newReservation: Reservation = {
      userId: this.currentUser?._id ?? '',
      bookId: _id,
      reservationDate: new Date()
    } as Reservation;

    this.reservationService.addReservation(newReservation).subscribe(reservation => {
      alert(`Książka została pomyślnie zarezerwowana.`);
      
      book.isAvailable = false;

      this.bookService.updateBook(book).subscribe(updatedBook => {
        this.loadBooks();
      }, error => {
        alert('Nie udało się zaktualizować książki.');
      });

      this.loadReservations();
    }, error => {
      alert('Nie udało się zarezerwować książki.');
    });
  }

  cancelReservation(_id: string): void {
    const reservation = this.reservations.find(res => res._id === _id);
    if (!reservation) {
      alert('Nie znaleziono rezerwacji.');
      return;
    }

    this.reservationService.cancelReservation(_id).subscribe(() => {
      alert('Rezerwacja została anulowana.');

      const book = this.books.find(b => b._id === reservation.bookId);
      if (book) {
        book.isAvailable = true;

        this.bookService.updateBook(book).subscribe(updatedBook => {
          this.loadBooks();
        }, error => {
          alert('Nie udało się zaktualizować książki.');
        });
      }

      this.loadReservations();
    }, error => {
      alert('Nie udało się anulować rezerwacji.');
    });
  }

  isBookReserved(_id: string): boolean {
    return this.reservations.some(reservation => reservation.bookId === _id);
  }

  isBookLoaned(_id: string): boolean {
    const book = this.books.find(book => book._id === _id);
    if (!book) {
      return false;
    }
    return book.isAvailable === false;
  }

  getFilteredBooks(): Book[] {
    let filteredBooks = this.books.filter(book => 
      book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      book.genre.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    return filteredBooks;
  }

  sortBooks(property: keyof Book): void {
    if (this.sortProperty === property) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortProperty = property;
      this.sortDirection = 'asc';
    }
    this.books = this.books.sort((a, b) => {
      if (a[property] < b[property]) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (a[property] > b[property]) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  getBookById(bookId: string): Book | undefined {
    return this.books.find(book => book._id === bookId);
  }
}
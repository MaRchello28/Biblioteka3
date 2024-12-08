import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation.model';
import { Book } from '../models/book.model';
import { BookService } from './book.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private userId: number = 1;
  reservations: Reservation[] = [
    new Reservation(1, 3, 1, new Date('2025-11-20'))
  ]

  constructor(private bookService: BookService) { }

  getReservations(): Reservation[] {
    return this.reservations.filter(res => res.userId === this.userId);
  }

  canReserveBook(): boolean {
    const userReservations = this.getReservations();
    return userReservations.length < 4;
  }

  reserveBook(bookId: number): void {
    if (this.canReserveBook()) {
      const reservationId = this.reservations.length + 1;
      const reservation = new Reservation(reservationId, bookId, this.userId, new Date());
      this.reservations.push(reservation);
      this.bookService.updateBookAvailability(bookId, false);
    } else {
      alert('Nie możesz zarezerwować więcej niż 4 książek.');
    }
  }

  cancelReservation(reservationId: number): void {
    const reservationIndex = this.reservations.findIndex(res => res.reservationId === reservationId);
    if (reservationIndex !== -1) {
      const reservation = this.reservations[reservationIndex];
      this.reservations.splice(reservationIndex, 1);
      this.bookService.updateBookAvailability(reservation.bookId, true);
    }
  }
  
  getBookTitle(bookId: number): string {
    const book = this.bookService.books.find((b: Book) => b.bookId === bookId);
    return book ? book.title : 'Nie znaleziono książki';
  }
}

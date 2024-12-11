import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reservation } from '../../models/reservation.model';
import { Book } from '../../models/book.model';
import { User } from '../../models/user.model';
import { ReservationService } from '../../services/reservation.service';
import { BookService } from '../../services/book.service';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-show-reserves',
  standalone: true,
  templateUrl: './show-reserve.component.html',
  styleUrls: ['./show-reserve.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ShowReservesComponent implements OnInit {
  reservations: Reservation[] = [];
  filteredReservations: Reservation[] = [];
  books: Book[] = [];
  users: User[] = [];
  searchQuery: string = '';
  showReserves: boolean = true;  // To toggle between loans and reserves

  constructor(
    private reservationService: ReservationService,
    private bookService: BookService,
    private loginService: LoginService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe(reservations => {
      this.reservations = reservations;
      this.filteredReservations = [...this.reservations];
    });

    this.bookService.getBooks().subscribe(books => {
      this.books = books;
    });

    this.loginService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  filterReservations(): void {
    if (!this.searchQuery) {
      this.filteredReservations = [...this.reservations];
    } else {
      this.filteredReservations = this.reservations.filter(reservation =>
        this.getBookById(reservation.bookId)?.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        this.getBookById(reservation.bookId)?.author.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        this.getUserById(reservation.userId)?.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        this.getUserById(reservation.userId)?.lastName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  onSearchChange(): void {
    this.filterReservations();
  }

  getBookById(bookId: string): Book | undefined {
    return this.books.find(book => book._id === bookId);
  }

  getUserById(userId: string): User | undefined {
    return this.users.find(user => user._id === userId);
  }

  cancelReservation(_id: string): void {
    this.reservationService.cancelReservation(_id).subscribe(() => {
      this.reservations = this.reservations.filter(reservation => reservation._id !== _id);
      this.filteredReservations = this.filteredReservations.filter(reservation => reservation._id !== _id);
      alert('Rezerwacja została anulowana.');
    });
  }
}

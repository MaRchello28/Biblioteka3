import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Loan } from '../../models/loan.model';
import { Book } from '../../models/book.model';
import { User } from '../../models/user.model';
import { LoanService } from '../../services/loan.service';
import { BookService } from '../../services/book.service';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../../models/reservation.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-show-loans',
  standalone: true,
  templateUrl: './show-loans.component.html',
  styleUrls: ['./show-loans.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ShowLoansComponent implements OnInit {
  loans: Loan[] = [];
  filteredLoans: Loan[] = [];
  reservations: Reservation[] = [];
  filteredReservations: Reservation[] = [];
  books: Book[] = [];
  users: User[] = [];
  searchQuery: string = '';
  showReserves: boolean = false;
  apiUrl: string = 'http://localhost:3000';

  constructor(
    private loanService: LoanService,
    private bookService: BookService,
    private loginService: LoginService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loanService.getLoans().subscribe(loans => {
      this.loans = loans;
      this.filteredLoans = [...this.loans];
    });

    this.bookService.getBooks().subscribe(books => {
      this.books = books;
    });

    this.loginService.getUsers().subscribe(users => {
      this.users = users;
    });

    this.getReservations().subscribe(reservations => {
      this.reservations = reservations;
      this.filteredReservations = [...this.reservations];
    });
  }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/reservations/get`);
  }

  filterLoans(): void {
    if (!this.searchQuery) {
      this.filteredLoans = [...this.loans];
    } else {
      this.filteredLoans = this.loans.filter(loan =>
        this.getBookById(loan.bookId)?.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        this.getBookById(loan.bookId)?.author.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        this.getUserById(loan.userId)?.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        this.getUserById(loan.userId)?.lastName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
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
    if (this.showReserves) {
      this.filterReservations();
    } else {
      this.filterLoans();
    }
  }

  getBookById(bookId: string): Book | undefined {
    return this.books.find(book => book._id === bookId);
  }

  getUserById(userId: string): User | undefined {
    return this.users.find(user => user._id === userId);
  }

  markAsReturned(_id: string): void {
    const loanToUpdate = this.loans.find(loan => loan._id === _id);
  
    if (loanToUpdate) {
      const updatedLoan: Loan = { ...loanToUpdate, isReturned: true };
      this.loanService.updateLoan(updatedLoan).subscribe({
        next: (response) => {
          this.loans = this.loans.map(loan =>
            loan._id === response._id ? response : loan
          );
  
          this.filteredLoans = this.filteredLoans.map(loan =>
            loan._id === response._id ? response : loan
          );
          alert('Książka została oznaczona jako zwrócona.');
        },
        error: (err) => {
          console.error('Błąd podczas aktualizacji wypożyczenia:', err);
          alert('Nie udało się oznaczyć książki jako zwróconej. Spróbuj ponownie później.');
        },
      });
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Loan } from '../../models/loan.model';
import { Book } from '../../models/book.model';
import { User } from '../../models/user.model';
import { LoanService } from '../../services/loan.service';
import { BookService } from '../../services/book.service';    // Import serwisu dla książek
import { LoginService } from '../../services/login.service';    // Import serwisu dla użytkowników

@Component({
  selector: 'app-show-loans',
  standalone: true,
  templateUrl: './show-loans.component.html',
  styleUrls: ['./show-loans.component.css'],
  imports: [CommonModule]
})
export class ShowLoansComponent implements OnInit {
  loans: Loan[] = [];
  books: Book[] = [];
  users: User[] = [];

  constructor(
    private loanService: LoanService,
    private bookService: BookService,     // Wstrzyknięcie serwisu książek
    private loginserive: LoginService      // Wstrzyknięcie serwisu użytkowników
  ) { }

  ngOnInit(): void {
    this.loans = this.loanService.getLoans();
    this.books = this.bookService.getBooks();     // Pobranie książek
    this.users = this.loginserive.getUsers();     // Pobranie użytkowników
  }

  getBookById(bookId: number): Book | undefined {
    return this.books.find(book => book.bookId === bookId);
  }

  getUserById(userId: number): User | undefined {
    return this.users.find(user => user.userId === userId);
  }
}

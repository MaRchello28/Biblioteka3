import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Loan } from '../../models/loan.model';
import { Book } from '../../models/book.model';
import { User } from '../../models/user.model';
import { LoanService } from '../../services/loan.service';
import { BookService } from '../../services/book.service';    // Import serwisu dla książek
import { LoginService } from '../../services/login.service';    // Import serwisu dla użytkowników
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-show-loans',
  standalone: true,
  templateUrl: './show-loans.component.html',
  styleUrls: ['./show-loans.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ShowLoansComponent implements OnInit {
  loans: Loan[] = [];
  filteredLoans: Loan[] = [];  // Zmienna do przechowywania przefiltrowanych wypożyczeń
  books: Book[] = [];
  users: User[] = [];
  searchQuery: string = '';  // Zmienna do przechowywania zapytania wyszukiwania

  constructor(
    private loanService: LoanService,
    private bookService: BookService,     // Wstrzyknięcie serwisu książek
    private loginserive: LoginService      // Wstrzyknięcie serwisu użytkowników
  ) { }

  ngOnInit(): void {
    this.loans = this.loanService.getLoans();
    this.books = this.bookService.getBooks();     // Pobranie książek
    this.users = this.loginserive.getUsers();     // Pobranie użytkowników
    this.filteredLoans = [...this.loans];  // Początkowo wyświetl wszystkie wypożyczenia
  }

  // Metoda do filtrowania wypożyczeń na podstawie zapytania wyszukiwania
  filterLoans(): void {
    if (!this.searchQuery) {
      this.filteredLoans = [...this.loans];  // Jeśli brak zapytania, wyświetl wszystkie wypożyczenia
    } else {
      this.filteredLoans = this.loans.filter(loan =>
        this.getBookById(loan.bookId)?.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        this.getBookById(loan.bookId)?.author.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        this.getUserById(loan.userId)?.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        this.getUserById(loan.userId)?.lastName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  // Ustawienie zapytania wyszukiwania
  onSearchChange(): void {
    this.filterLoans();  // Wywołaj metodę filtrowania po zmianie zapytania
  }

  getBookById(bookId: number): Book | undefined {
    return this.books.find(book => book.bookId === bookId);
  }

  getUserById(userId: number): User | undefined {
    return this.users.find(user => user.userId === userId);
  }

  // Metoda do oznaczania książki jako zwróconej
  markAsReturned(loanId: number): void {
    this.loanService.markAsReturned(loanId);  // Wywołanie metody w serwisie
    this.filteredLoans = this.filteredLoans.map(loan => 
      loan.loanId === loanId ? { ...loan, isReturned: true } : loan
    );
  }
}

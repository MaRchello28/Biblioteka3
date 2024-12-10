import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Loan } from '../../models/loan.model';
import { Book } from '../../models/book.model';
import { User } from '../../models/user.model';
import { LoanService } from '../../services/loan.service';
import { BookService } from '../../services/book.service';   
import { LoginService } from '../../services/login.service';    
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
  filteredLoans: Loan[] = []; 
  books: Book[] = [];
  users: User[] = [];
  searchQuery: string = ''; 

  constructor(
    private loanService: LoanService,
    private bookService: BookService,     
    private loginserive: LoginService     
  ) { }

  ngOnInit(): void {
    this.loans = this.loanService.getLoans();
    this.books = this.bookService.getBooks();   
    this.users = this.loginserive.getUsers();   
    this.filteredLoans = [...this.loans];  
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


  onSearchChange(): void {
    this.filterLoans(); 
  }

  getBookById(bookId: number): Book | undefined {
    return this.books.find(book => book.bookId === bookId);
  }

  getUserById(userId: number): User | undefined {
    return this.users.find(user => user.userId === userId);
  }

  markAsReturned(loanId: number): void {
    this.loanService.markAsReturned(loanId);  
    this.filteredLoans = this.filteredLoans.map(loan => 
      loan.loanId === loanId ? { ...loan, isReturned: true } : loan
    );
  }
}

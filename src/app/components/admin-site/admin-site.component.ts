import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShowLoansComponent } from '../show-loans/show-loans.component';
import { ManageBooksComponent } from '../manage-books/manage-books.component';
import { ManageUsersComponent } from '../manage-users/manage-users.component';
import { LoanService } from '../../services/loan.service';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { Loan } from '../../models/loan.model';

@Component({
  selector: 'app-admin-site',
  standalone: true,
  templateUrl: './admin-site.component.html',
  styleUrls: ['./admin-site.component.css'],
  imports: [CommonModule, FormsModule, ShowLoansComponent, ManageBooksComponent, ManageUsersComponent]
})
export class AdminSiteComponent implements OnInit {
  isLoanListVisible = false;
  isManageBooksVisible = false;
  isManageUsersVisible = false;
  isReportVisible = false;
  loanStatistics: any[] = []; 
  filteredLoanStatistics: any[] = [];
  searchQuery: string = ''; 
  minLoans: number = 0;
  books: Book[] = [];
  loans: Loan[] = [];
  i = 0;

  constructor(
    private loanService: LoanService,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe((books: Book[]) => {
      this.books = books;
      this.loadLoans();
    });
  }

  loadLoans(): void {
    this.loanService.getLoans().subscribe((loans: Loan[]) => {
      this.loans = loans;
      this.calculateLoanStatistics();
    });
  }

  calculateLoanStatistics(): void {
    this.loanStatistics = this.books.map(book => {
      const loanCount = this.loans.filter(loan => loan.bookId === book._id).length;
      return {
        bookId: book._id,
        title: book.title,
        author: book.author,
        totalLoans: loanCount
      };
    });
    this.loanStatistics.sort((a, b) => b.totalLoans - a.totalLoans);
    this.filterLoanStatistics();
  }

  filterLoanStatistics(): void {
    this.filteredLoanStatistics = this.loanStatistics.filter(stat => 
      (stat.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
      stat.author.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
      stat.totalLoans >= this.minLoans // Filtrowanie na podstawie minimalnej liczby wypożyczeń
    );
  }

  onSearchChange(): void {
    this.filterLoanStatistics();  
  }

  SeeList(): void {
    this.resetVisibility();
    this.isLoanListVisible = true;
  }

  manageBook(): void {
    this.resetVisibility();
    this.isManageBooksVisible = true;
  }

  manageUser(): void {
    this.resetVisibility();
    this.isManageUsersVisible = true;
  }

  raport(): void {
    this.resetVisibility();
    this.isReportVisible = true;
  }

  private resetVisibility(): void {
    this.isLoanListVisible = false;
    this.isManageBooksVisible = false;
    this.isManageUsersVisible = false;
    this.isReportVisible = false;
  }
}
import { Component, OnInit } from '@angular/core';
import { ReserveBookComponent } from '../reserve-book/reserve-book.component';
import { CommonModule } from '@angular/common';
import { Loan } from '../../models/loan.model';
import { Book } from '../../models/book.model';
import { LoanService } from '../../services/loan.service';
import { LoanBookComponent } from "../loan-books/loan-books.component";
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-user-site',
  templateUrl: './user-site.component.html',
  styleUrls: ['./user-site.component.css'],
  imports: [ReserveBookComponent, CommonModule, LoanBookComponent],
})
export class UserSiteComponent implements OnInit {
  loans: Loan[] = [];
  books: Book[] = [];
  isReserveBookVisible = false;
  isLoanBookVisible = false;
  isHistoryVisible = false;

  constructor(private loanService: LoanService, private bookService: BookService) {}

  ngOnInit(): void {}

  reserveBook(): void {
    this.isReserveBookVisible = true;
    this.isLoanBookVisible = false;
  }

  loadBooks(): void {
    this.books = this.bookService.getBooks();
  }

  showLoanBook(isHistory: boolean): void {
    this.isLoanBookVisible = true;
    this.isReserveBookVisible = false;
    this.isHistoryVisible = isHistory;

    this.loadUserLoans();
  }

  loadUserLoans(): void {
    this.loans = this.loanService.getUserLoans(1);
  }

  showReserveBook(): void {
    this.isLoanBookVisible = false;
    this.isReserveBookVisible = true;
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Loan } from '../../models/loan.model';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { LoanService } from '../../services/loan.service';

@Component({
  selector: 'app-loan-book',
  templateUrl: './loan-books.component.html',
  styleUrls: ['./loan-books.component.css'],
  imports: [CommonModule]
})
export class LoanBookComponent implements OnInit {
  @Input() loans: Loan[] = [];
  @Input() currentUserId: string | null = null;
  books: Book[] = [];
  isLoanHistoryVisible: boolean = false;
  filteredLoans: Loan[] = [];

  constructor(private bookService: BookService, public loanService: LoanService) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books: Book[]) => {
      this.books = books;
    });

    this.loanService.getLoans().subscribe((loans: Loan[]) => {
      this.loans = loans;
      this.filterLoans();
    });
  }

  filterLoans(): void {
    console.log('currentUserId:', this.currentUserId);
    console.log("typeof: " + typeof this.currentUserId);
    console.log("typeof userId in loan: " + typeof this.loans[0].userId);
    if (this.currentUserId) {
      this.filteredLoans = this.loans.filter(loan => {
        const loanUserId = loan.userId?.toString()
        return loanUserId === this.currentUserId;
      });
      console.log('Przefiltrowane wypożyczenia:', this.filteredLoans);
    } else {
      console.log('Brak currentUserId');
    }
  }

  showLoanHistory(): void {
    this.isLoanHistoryVisible = true;
  }

  getBookTitle(bookId: string): string {
    const book = this.books.find((b) => b._id == bookId);
    console.log(book)
    return book ? book.title : 'Brak nazwy książki';
  }
  
  parseDate(dateString: string): Date {
    return new Date(dateString);
  }
}

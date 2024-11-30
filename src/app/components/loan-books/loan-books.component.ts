import { Component, Input, OnInit } from '@angular/core';
import { Loan } from '../../models/loan.model';
import { LoanService } from '../../services/loan.service';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-loan-book',
  templateUrl: './loan-books.component.html',
  styleUrls: ['./loan-books.component.css'],
  imports: [CommonModule]
})
export class LoanBookComponent implements OnInit {
  @Input() loans: Loan[] = [];
  @Input() books: Book[] = [];
  isLoanHistoryVisible: boolean = false;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.books = this.bookService.getBooks();
  }

  showLoanHistory(): void {
    this.isLoanHistoryVisible = true;
  }

  getBookTitle(bookId: number): string {
    const book = this.books.find((b) => b.bookId === bookId);
    return book ? book.title : 'Brak nazwy książki';
  }
}

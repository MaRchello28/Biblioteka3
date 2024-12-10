import { Component, Input, OnInit } from '@angular/core';
import { Loan } from '../../models/loan.model';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loan-book',
  templateUrl: './loan-books.component.html',
  styleUrls: ['./loan-books.component.css'],
  imports: [CommonModule]
})
export class LoanBookComponent implements OnInit {
  @Input() loans: Loan[] = [];
  books: Book[] = [];
  isLoanHistoryVisible: boolean = false;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books: Book[]) => {
      this.books = books;
      console.log(this.loans);
    });
  }

  showLoanHistory(): void {
    this.isLoanHistoryVisible = true;
  }

  getBookTitle(bookId: number): string {
    const book = this.books.find((b) => b.bookId === bookId);
    return book ? book.title : 'Brak nazwy książki';
  }
  
  parseDate(dateString: string): Date {
    return new Date(dateString);
  }
}

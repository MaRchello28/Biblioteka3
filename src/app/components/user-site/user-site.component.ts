import { Component, OnInit } from '@angular/core';
import { ReserveBookComponent } from '../reserve-book/reserve-book.component';
import { CommonModule } from '@angular/common';
import { Loan } from '../../models/loan.model';
import { Book } from '../../models/book.model';
import { LoanService } from '../../services/loan.service';
import { LoanBookComponent } from "../loan-books/loan-books.component";
import { BookService } from '../../services/book.service';
import { User } from '../../models/user.model';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-user-site',
  templateUrl: './user-site.component.html',
  styleUrls: ['./user-site.component.css'],
  imports: [ReserveBookComponent, CommonModule, LoanBookComponent, UserProfileComponent],
})
export class UserSiteComponent implements OnInit {
  loans: Loan[] = [];
  books: Book[] = [];
  isReserveBookVisible = false;
  isLoanBookVisible = false;
  isHistoryVisible = false;
  isProfileVisible = false;
  currentUser: User | null = null;
  overdueLoans: Loan[] = [];
  isOverdueAlertVisible = false;

  constructor(
    private loanService: LoanService,
    private bookService: BookService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      this.loadUserLoans();
    });
  }

  reserveBook(): void {
    this.isReserveBookVisible = true;
    this.isLoanBookVisible = false;
    this.isProfileVisible = false;
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
    });
  }

  showLoanBook(isHistory: boolean): void {
    this.isLoanBookVisible = true;
    this.isReserveBookVisible = false;
    this.isProfileVisible = false;
    this.isHistoryVisible = isHistory;
    this.loadUserLoans();
  }

  loadUserLoans(): void {
    this.loanService.getLoans().subscribe(loans => {
      this.loans = loans;
    });
  }

  showReserveBook(): void {
    this.isLoanBookVisible = false;
    this.isReserveBookVisible = true;
    this.isProfileVisible = false;
  }

  showProfile(): void {
    this.isLoanBookVisible = false;
    this.isReserveBookVisible = false;
    this.isProfileVisible = true;
  }

  showOverdueBooks(): void {
    const today = new Date();
    this.overdueLoans = this.loans.filter(loan => !loan.isReturned && new Date(loan.returnDate) < today);
    console.log('Overdue loans:', this.overdueLoans);
  
    if (this.overdueLoans.length > 0) {
      this.isOverdueAlertVisible = true;
  
      const overdueBookTitles: string[] = [];
      const overdueBooks$ = this.bookService.getBooks();
      overdueBooks$.subscribe(books => {
        console.log('Books from API:', books);
  
        this.overdueLoans.forEach(loan => {
          const book = books.find(b => b._id === loan.bookId);
          if (book) overdueBookTitles.push(book.title);
        });
        console.log('Overdue book titles:', overdueBookTitles);
  
        if (overdueBookTitles.length > 0) {
          setTimeout(() => {
            alert(`Masz niezwrócone książki po terminie: ${overdueBookTitles.join(', ')}`);
          }, 500);
        }
      });
    } else {
      this.isOverdueAlertVisible = false;
      alert("Nie masz żadnych książek niezwróconych po terminie.");
    }
  }
}

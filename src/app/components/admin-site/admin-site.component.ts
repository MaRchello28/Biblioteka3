import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShowLoansComponent } from '../show-loans/show-loans.component';
import { ManageBooksComponent } from '../manage-books/manage-books.component'; 
import { ManageUsersComponent } from '../manage-users/manage-users.component';
import { LoanService } from '../../services/loan.service'; 
import { BookService } from '../../services/book.service';  

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

  constructor(
    private loanService: LoanService,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.loadLoanStatistics();  
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
    this.loadLoanStatistics();  
  }

  private resetVisibility(): void {
    this.isLoanListVisible = false;
    this.isManageBooksVisible = false;
    this.isManageUsersVisible = false;
    this.isReportVisible = false;
  }

  private loadLoanStatistics(): void {
    const books = this.bookService.getBooks();  
    const loanData = this.loanService.getLoanStatistics(books);  

    const totalLoans = loanData.reduce((sum, stat) => sum + stat.totalLoans, 0);  

    this.loanStatistics = loanData.map((stat, index) => {
      const percentage = totalLoans ? (stat.totalLoans / totalLoans) * 100 : 0;
      return {
        rank: index + 1, 
        ...stat,
        percentage: percentage
      };
    });

    this.loanStatistics.sort((a, b) => b.totalLoans - a.totalLoans);

    this.filteredLoanStatistics = [...this.loanStatistics];
  }

  filterBooks(): void {
    if (!this.searchQuery) {
      this.filteredLoanStatistics = [...this.loanStatistics];  
    } else {
      this.filteredLoanStatistics = this.loanStatistics.filter(stat =>
        stat.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        stat.author.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  onSearchChange(): void {
    this.filterBooks();  
  }
}

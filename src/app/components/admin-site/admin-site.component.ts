import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShowLoansComponent } from '../show-loans/show-loans.component';
import { ManageBooksComponent } from '../manage-books/manage-books.component'; 
import { ManageUsersComponent } from '../manage-users/manage-users.component';
import { LoanService } from '../../services/loan.service';  // Import serwisu wypożyczeń
import { BookService } from '../../services/book.service';  // Import serwisu książek

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
  loanStatistics: any[] = [];  // Tablica przechowująca dane statystyczne wypożyczeń
  filteredLoanStatistics: any[] = []; // Filtrowane dane wypożyczeń
  searchQuery: string = '';  // Zmienna do przechowywania zapytania wyszukiwania

  constructor(
    private loanService: LoanService,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.loadLoanStatistics();  // Załaduj dane statystyczne wypożyczeń na starcie
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
    this.loadLoanStatistics();  // Załaduj statystyki przy wyświetlaniu raportu
  }

  private resetVisibility(): void {
    this.isLoanListVisible = false;
    this.isManageBooksVisible = false;
    this.isManageUsersVisible = false;
    this.isReportVisible = false;
  }

  // Funkcja do załadowania danych statystycznych wypożyczeń
  private loadLoanStatistics(): void {
    const books = this.bookService.getBooks();  // Pobierz książki z serwisu
    const loanData = this.loanService.getLoanStatistics(books);  // Uzyskaj dane o wypożyczeniach

    // Obliczanie liczby wypożyczeń i przypisanie rankingu
    const totalLoans = loanData.reduce((sum, stat) => sum + stat.totalLoans, 0);  // Suma wszystkich wypożyczeń

    this.loanStatistics = loanData.map((stat, index) => {
      const percentage = totalLoans ? (stat.totalLoans / totalLoans) * 100 : 0;
      return {
        rank: index + 1,  // Numer rankingu (stały, przypisany na podstawie pozycji w posortowanej liście)
        ...stat,
        percentage: percentage
      };
    });

    // Sortowanie książek według liczby wypożyczeń (od największej)
    this.loanStatistics.sort((a, b) => b.totalLoans - a.totalLoans);

    // Początkowo ustawiamy przefiltrowane dane na wszystkie statystyki
    this.filteredLoanStatistics = [...this.loanStatistics];
  }

  // Metoda do filtrowania książek na podstawie zapytania wyszukiwania
  filterBooks(): void {
    if (!this.searchQuery) {
      this.filteredLoanStatistics = [...this.loanStatistics];  // Jeśli brak zapytania, wyświetl wszystkie książki
    } else {
      this.filteredLoanStatistics = this.loanStatistics.filter(stat =>
        stat.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        stat.author.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  // Ustawienie zapytania wyszukiwania
  onSearchChange(): void {
    this.filterBooks();  // Wywołaj metodę filtrowania po zmianie zapytania
  }
}

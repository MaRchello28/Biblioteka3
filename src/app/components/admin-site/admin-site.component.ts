import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShowLoansComponent } from '../show-loans/show-loans.component'; // Import komponentu do listy wypożyczeń

@Component({
  selector: 'app-admin-site',
  standalone: true,
  templateUrl: './admin-site.component.html',
  styleUrls: ['./admin-site.component.css'],
  imports: [CommonModule, FormsModule, ShowLoansComponent]
})
export class AdminSiteComponent implements OnInit {
  // Flagi kontrolujące widoczność komponentów
  isLoanListVisible = false;
  isManageBooksVisible = false;
  isManageUsersVisible = false;
  isReportVisible = false;

  constructor() { }

  ngOnInit(): void {
    // Można załadować dane użytkownika lub przeprowadzić inne działania po załadowaniu strony
  }

  // Metody obsługujące kliknięcia przycisków
  SeeList(): void {
    this.resetVisibility();
    this.isLoanListVisible = true;
  }

  manageBook(): void {

  }

  manageUser(): void {

  }

  raport(): void {

  }

  // Funkcja do resetowania widoczności
  private resetVisibility(): void {
    this.isLoanListVisible = false;

  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShowLoansComponent } from '../show-loans/show-loans.component';
import { ManageBooksComponent } from '../manage-books/manage-books.component'; // Import komponentu zarządzania książkami

@Component({
  selector: 'app-admin-site',
  standalone: true,
  templateUrl: './admin-site.component.html',
  styleUrls: ['./admin-site.component.css'],
  imports: [CommonModule, FormsModule, ShowLoansComponent, ManageBooksComponent] // Dodaj wymagane komponenty
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

  // Funkcja do resetowania widoczności
  private resetVisibility(): void {
    this.isLoanListVisible = false;
    this.isManageBooksVisible = false;
    this.isManageUsersVisible = false;
    this.isReportVisible = false;
  }
}

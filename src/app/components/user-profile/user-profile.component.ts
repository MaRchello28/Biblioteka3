import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, UserEditComponent],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @Input() user: User | null = null;
  isPasswordVisible = false;

  editingField: keyof User | null = null;
  editableUser: User | null = null;

  errorMessage: string | null = null;  // Komunikat błędu na poziomie całego komponentu

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    if (!this.user) {
      this.setErrorMessage('Brak danych użytkownika!');
    }
  }

  showPassword(): void {
    this.isPasswordVisible = true;
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  startEdit(field: keyof User): void {
    this.editingField = field;
    if (this.user) {
      this.editableUser = { ...this.user };
    }
  }

  saveEdit(newValue: string): void {
    if (this.user && this.editingField) {
      const field = this.editingField;
  
      // Walidacja dla Imienia
      if (field === 'firstName' && !/^[A-Za-z]+$/.test(newValue)) {
        this.setErrorMessage('Imię może zawierać tylko litery.');
        return; // Zatrzymanie dalszego zapisu w przypadku błędu
      }
  
      // Inne przypadki zapisu
      switch (field) {
        case 'firstName':
        case 'lastName':
        case 'email':
        case 'role':
        case 'password':
          this.user[field] = newValue;
          break;
        case 'userId':
          this.user[field] = Number(newValue);
          break;
        default:
          console.error(`Field ${field} is not editable.`);
      }
  
      // Zakończenie edycji
      this.editingField = null;
    }
  }

  cancelEdit(): void {
    this.editingField = null;
    this.editableUser = null;
  }

  // Funkcja do ustawienia komunikatu o błędzie
  setErrorMessage(message: string): void {
    this.errorMessage = message;
  }

  // Funkcja do usunięcia komunikatu o błędzie
  clearErrorMessage(): void {
    this.errorMessage = null;
  }
}
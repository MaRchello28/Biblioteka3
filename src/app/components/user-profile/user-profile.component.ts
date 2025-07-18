import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { LoginService } from '../../services/login.service';

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

  errorMessage: string | null = null;

  constructor(private dialog: MatDialog, private userService: LoginService) {}

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

      if (field === 'firstName' && !/^[A-Za-z]+$/.test(newValue)) {
        this.setErrorMessage('Imię może zawierać tylko litery.');
        return;
      }

      switch (field) {
        case 'firstName':
        case 'lastName':
        case 'email':
        case 'role':
        case 'password':
          this.updateUser(field, newValue);
          break;
        case '_id':
          this.user[field] = String(newValue);
          break;
        default:
          console.error(`Field ${field} is not editable.`);
      }

      this.editingField = null;
    }
  }

  cancelEdit(): void {
    this.editingField = null;
    this.editableUser = null;
  }

  setErrorMessage(message: string): void {
    this.errorMessage = message;
  }

  clearErrorMessage(): void {
    this.errorMessage = null;
  }

  updateUser(field: keyof User, newValue: string): void {
    if (this.user) {
      const updatedUser = { ...this.user, [field]: newValue };
      this.userService.updateUser(updatedUser).subscribe(
        () => {
          this.user = updatedUser;
          this.editingField = null;
        },
        (error) => {
          this.setErrorMessage('Wystąpił błąd podczas zapisywania danych użytkownika.');
        }
      );
    }
  }
}
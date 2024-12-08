import { Component, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { UserEditComponent } from "../user-edit/user-edit.component";

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, UserEditComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  @Input() user: User | null = null;
  isPasswordVisible = false;

  editingField: keyof User | null = null;
  editableUser: User | null = null;

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
    }
  
    this.editingField = null;
  }
  cancelEdit(): void {
    this.editingField = null;
    this.editableUser = null;
  }
}

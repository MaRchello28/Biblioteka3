import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ManageUsersComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  newUser: User = new User('', '', '', 'user', '');
  confirmPassword: string = '';
  showUserList = true;
  emailError: string = '';
  passwordError: string = '';

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loginService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        console.error('Błąd ładowania użytkowników', err);
      }
    });
  }

  selectUser(user: User): void {
    this.selectedUser = { ...user };
  }

  saveUser(): void {
    if (this.selectedUser) {
      this.loginService.updateUser(this.selectedUser).subscribe({
        next: (updatedUser) => {
          const index = this.users.findIndex(user => user._id === updatedUser._id);
          if (index !== -1) {
            this.users[index] = updatedUser;
          }
          this.selectedUser = null;
        },
        error: (err) => {
          console.error('Błąd podczas zapisywania użytkownika', err);
        }
      });
    }
  }

  addUser(): void {
    this.emailError = '';
    this.passwordError = '';

    if (!this.isValidEmail(this.newUser.email)) {
      alert('Proszę wprowadzić poprawny adres email');
      return;
    }

    if (this.newUser.password !== this.confirmPassword) {
      alert('Hasła muszą być takie same');
      return;
    }

    if (this.isValidUser(this.newUser)) {
      this.loginService.addUser(this.newUser).subscribe({
        next: (newUser) => {
          this.users.push(newUser);
          this.newUser = new User('', '', '', 'user', '');
          this.confirmPassword = '';
        },
        error: (err) => {
          console.error('Błąd podczas dodawania użytkownika', err);
        }
      });
    } else {
      alert('Proszę uzupełnić wszystkie pola');
    }
  }

  isValidUser(user: User): boolean {
    return user.firstName !== '' && user.lastName !== '' && user.email !== '' && user.password !== '';
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  }

  deleteUser(_id: string): void {
    const confirmDelete = window.confirm('Czy na pewno chcesz usunąć tego użytkownika?');
    if (confirmDelete) {
      this.loginService.deleteUser(_id).subscribe({
        next: () => {
          this.users = this.users.filter(user => user._id !== _id);
        },
        error: (err) => {
          console.error('Błąd podczas usuwania użytkownika', err);
        }
      });
    } else {
      console.log('Usuwanie użytkownika anulowane');
    }
  }

  toggleView(): void {
    this.showUserList = !this.showUserList;
  }
}
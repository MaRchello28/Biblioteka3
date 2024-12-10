import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
  standalone: true, // Ensure this is set for standalone components
  imports: [CommonModule, FormsModule] // Add FormsModule to the imports
})
export class ManageUsersComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  newUser: User = new User(0, '', '', '', 'user', '', []);  // Adding password to new user

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.users = this.loginService.getUsers();
  }

  // Wybieranie użytkownika do edycji
  selectUser(user: User): void {
    this.selectedUser = { ...user };
  }

  // Zapisz zmiany użytkownika
  saveUser(): void {
    if (this.selectedUser) {
      const index = this.users.findIndex(user => user.userId === this.selectedUser?.userId);
      if (index !== -1) {
        this.users[index] = this.selectedUser;
      }
      this.selectedUser = null;
    }
  }

  // Dodanie nowego użytkownika
  addUser(): void {
    if (this.isValidUser(this.newUser)) {
      this.newUser.userId = this.users.length + 1;  // Możesz zmienić logikę nadawania ID
      this.loginService.addUser(this.newUser);
      this.newUser = new User(0, '', '', '', 'user', '', []);  // Resetowanie formularza, w tym hasła
    } else {
      alert('Proszę uzupełnić wszystkie pola');
    }
  }

  // Sprawdzenie poprawności użytkownika
  isValidUser(user: User): boolean {
    return user.firstName !== '' && user.lastName !== '' && user.email !== '' && user.password !== '';
  }

  // Usunięcie użytkownika
  deleteUser(userId: number): void {
    this.users = this.users.filter(user => user.userId !== userId);
  }
}

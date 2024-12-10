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
  newUser: User = new User(0, '', '', '', 'user', '', []);  

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.users = this.loginService.getUsers();
  }

  selectUser(user: User): void {
    this.selectedUser = { ...user };
  }

  saveUser(): void {
    if (this.selectedUser) {
      const index = this.users.findIndex(user => user.userId === this.selectedUser?.userId);
      if (index !== -1) {
        this.users[index] = this.selectedUser;
      }
      this.selectedUser = null;
    }
  }

  addUser(): void {
    if (this.isValidUser(this.newUser)) {
      this.newUser.userId = this.users.length + 1;  
      this.loginService.addUser(this.newUser);
      this.newUser = new User(0, '', '', '', 'user', '', []);  
    } else {
      alert('Proszę uzupełnić wszystkie pola');
    }
  }

  isValidUser(user: User): boolean {
    return user.firstName !== '' && user.lastName !== '' && user.email !== '' && user.password !== '';
  }

  deleteUser(userId: number): void {
    this.users = this.users.filter(user => user.userId !== userId);
  }
}

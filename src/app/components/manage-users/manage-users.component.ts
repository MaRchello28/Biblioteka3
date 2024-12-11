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
  newUser: User = new User('', '', '', 'user', '1234');  

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.getUsers().subscribe(users => {  
      this.users = users;  
    });
  }

  selectUser(user: User): void {
    this.selectedUser = { ...user };
  }

  saveUser(): void {
    if (this.selectedUser) {
      const index = this.users.findIndex(user => user._id === this.selectedUser?._id);
      if (index !== -1) {
        this.users[index] = this.selectedUser;
      }
      this.selectedUser = null;
    }
  }

  addUser(): void {
    if (this.isValidUser(this.newUser)) {
      this.loginService.addUser(this.newUser);
      this.newUser = new User('', '', '', 'user', '1234');  
    } else {
      alert('Proszę uzupełnić wszystkie pola');
    }
  }

  isValidUser(user: User): boolean {
    return user.firstName !== '' && user.lastName !== '' && user.email !== '' && user.password !== '';
  }

  deleteUser(_id: string): void {
    this.users = this.users.filter(user => user._id === _id);
  }
}

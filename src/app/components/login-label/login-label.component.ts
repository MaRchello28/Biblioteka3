import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Importowanie Routera
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login-label.component.html',
  styleUrls: ['./login-label.component.css'],
  imports: [CommonModule, FormsModule]
})
export class LoginLabelComponent implements OnInit {
  users: User[] = [];
  email: string = '';  // Zmienna na przechowywanie adresu email
  password: string = '';  // Zmienna na przechowywanie hasła
  errorMessage: string = '';  // Zmienna na komunikat o błędzie

  constructor(
    private loginservice: LoginService,
    private router: Router  // Iniekcja routera
  ) {}

  ngOnInit(): void {
    this.users = this.loginservice.getUsers();
  }
  onLoginSubmit(): void {
    const user = this.users.find(u => u.email === this.email && u.password === this.password);

    if (user) {
      this.router.navigate(['/user-site']);
    } else {
      this.errorMessage = 'Błędny email lub hasło.';
    }
  }
}

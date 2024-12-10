import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-label',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-label.component.html',
  styleUrls: ['./login-label.component.css']
})
export class LoginLabelComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  firstName: string = '';
  lastName: string = '';
  errorMessages: string[] = [];
  isRegistering: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  onLoginSubmit(): void {
    this.errorMessages = [];

    if (!this.email || !this.password) {
      this.errorMessages.push('Proszę wypełnić wszystkie pola.');
      return;
    }

    const user = this.loginService.getUsers().find(
      u => u.email === this.email && u.password === this.password
    );

    if (user) {
      this.errorMessages = [];
      this.router.navigate(['/user-site']);
    } else {
      this.errorMessages.push('Nieprawidłowy email lub hasło.');
    }
  }

  onRegisterSubmit(): void {
    this.errorMessages = [];

    if (!this.email || !this.password || !this.firstName || !this.lastName || !this.confirmPassword) {
      this.errorMessages.push('Proszę wypełnić wszystkie pola.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessages.push('Hasła muszą być takie same!');
    }

    if (this.loginService.getUsers().some(u => u.email === this.email)) {
      this.errorMessages.push('Użytkownik z tym emailem już istnieje.');
    }

    if (!/^[a-zA-Z]+$/.test(this.firstName)) {
      this.errorMessages.push('Imię może zawierać tylko litery.');
    }

    if (!/^[a-zA-Z]+$/.test(this.lastName)) {
      this.errorMessages.push('Nazwisko może zawierać tylko litery.');
    }

    if (!/\S+@\S+\.\S+/.test(this.email)) {
      this.errorMessages.push('To nie jest poprawny adres e-mail.');
    }

    if (this.errorMessages.length > 0) {
      return;
    }

    this.loginService.addUser({
      userId: this.loginService.getUsers().length + 1,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      role: 'user',
      password: this.password,
      borrowedBooks: []
    });

    this.errorMessages = [];
    this.isRegistering = false;
    alert('Rejestracja udana, teraz możesz się zalogować!');
  }

  switchToRegisterView(): void {
    this.isRegistering = true;
  }

  switchToLoginView(): void {
    this.isRegistering = false;
  }
}

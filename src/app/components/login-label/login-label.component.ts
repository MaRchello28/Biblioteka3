import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

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

  users$: Observable<User[]>;

  constructor(private loginService: LoginService, private router: Router) {
    this.users$ = this.loginService.getUsers();
  }

  onLoginSubmit(): void {
    this.errorMessages = [];
    
    if (!this.email || !this.password) {
      this.errorMessages.push('Proszę wypełnić wszystkie pola.');
      return;
    }
  
    this.loginService.getUsers().subscribe(users => {
      const user = users.find(u => u.email === this.email && u.password === this.password);
  
      if (user) {
        this.errorMessages = [];
        this.loginService.setCurrentUser(user);
        if (user.role === 'admin') {
          this.router.navigate(['/admin-site']);
        } else if (user.role === 'user') {
          this.router.navigate(['/user-site']);
        }
      } else {
        this.errorMessages.push('Nieprawidłowy email lub hasło.');
      }
    });
  }

  onRegisterSubmit(): void {
    this.errorMessages = [];
  
    if (!this.email || !this.password || !this.firstName || !this.lastName || !this.confirmPassword) {
      this.errorMessages.push('Proszę wypełnić wszystkie pola.');
      return;
    }
  
    if (this.password !== this.confirmPassword) {
      this.errorMessages.push('Hasła muszą być takie same!');
      return;
    }
  
    this.loginService.getUsers().subscribe(users => {
      if (users.some(u => u.email === this.email)) {
        this.errorMessages.push('Użytkownik z tym emailem już istnieje.');
        return;
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
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        role: 'user',
        password: this.password
      }).subscribe(newUser => {
        this.errorMessages = [];
        this.isRegistering = false;
        alert('Rejestracja udana, teraz możesz się zalogować!');
      });
    });
  }

  switchToRegisterView(): void {
    this.isRegistering = true;
  }

  switchToLoginView(): void {
    this.isRegistering = false;
  }
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-label',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-label.component.html',
  styleUrls: ['./register-label.component.css']
})
export class RegisterLabelComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  firstName: string = '';
  lastName: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  onRegisterSubmit(): void {
    if (this.email && this.password && this.confirmPassword && this.firstName && this.lastName) {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Hasła muszą być takie same!';
      } else {
        alert('Rejestracja udana, teraz możesz się zalogować!');
        this.router.navigate(['/login']);
      }
    } else {
      this.errorMessage = 'Proszę uzupełnić wszystkie pola.';
    }
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
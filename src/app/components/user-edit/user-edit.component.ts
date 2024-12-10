import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {
  @Input() fieldName: string = '';
  @Input() fieldValue: string = '';
  @Output() save = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  editableValue: string = '';
  errorMessage: string = '';

  ngOnInit(): void {
    this.editableValue = this.fieldValue;
  }

  onSave(): void {
    if (this.isValid()) {
      this.save.emit(this.editableValue);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  isValid(): boolean {
    this.errorMessage = '';

    if (this.fieldName === 'Email' && !this.isValidEmail(this.editableValue)) {
      this.errorMessage = 'Proszę podać poprawny adres e-mail.';
      return false;
    }

    if ((this.fieldName === 'Imię' || this.fieldName === 'Nazwisko') && !this.isValidName(this.editableValue)) {
      this.errorMessage = `${this.fieldName} może zawierać tylko litery.`;
      return false;
    }
    if (this.fieldName === 'Hasło' && !this.editableValue.trim()) {
      this.errorMessage = 'Hasło nie może być puste.';
      return false;
    }

    return true;
}

isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}

isValidName(name: string): boolean {
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name);
}

}
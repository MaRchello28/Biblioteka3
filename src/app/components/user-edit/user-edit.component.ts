import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent {
  @Input() fieldName: string = '';
  @Input() fieldValue: string = '';
  @Output() save = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  editableValue: string = '';

  ngOnInit(): void {
    this.editableValue = this.fieldValue;
  }

  onSave(): void {
    this.save.emit(this.editableValue);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

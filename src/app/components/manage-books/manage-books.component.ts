import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.css'],
  imports: [CommonModule,ReactiveFormsModule, FormsModule]

})
export class ManageBooksComponent implements OnInit {
  books: Book[] = [];
  newBookForm!: FormGroup;  // Zmienna formularza do dodawania książki
  editingBookForm!: FormGroup;  // Zmienna formularza do edytowania książki
  editingBook: Book | null = null;

  constructor(
    private bookService: BookService,
    private fb: FormBuilder 
  ) {
    // Przypisanie formularzy w konstruktorze
    this.newBookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      publicationYear: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      isAvailable: [true]
    });

    this.editingBookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      publicationYear: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      isAvailable: [true]
    });
  }

  ngOnInit(): void {
    this.books = this.bookService.getBooks();
  }

  addBook(): void {
    if (this.newBookForm.valid) {
      const newBook: Book = this.newBookForm.value;
      newBook.bookId = this.books.length ? Math.max(...this.books.map(book => book.bookId)) + 1 : 1;
      this.bookService.addBook(newBook);
      this.newBookForm.reset(); // Resetowanie formularza po dodaniu książki
    }
  }

  editBook(book: Book): void {
    this.editingBook = { ...book };  // Wypełnij formularz danymi książki do edycji
    this.editingBookForm.setValue({
      title: book.title,
      author: book.author,
      genre: book.genre,
      publicationYear: book.publicationYear,
      isAvailable: book.isAvailable
    });
  }

  saveEdit(): void {
    if (this.editingBookForm.valid && this.editingBook) {
      const updatedBook = this.editingBookForm.value;
      this.bookService.updateBook(updatedBook);
      this.editingBook = null;  // Zakończenie edycji
      this.editingBookForm.reset();  // Resetowanie formularza po zapisaniu edycji
    }
  }

  cancelEdit(): void {
    this.editingBook = null;  // Anulowanie edycji
    this.editingBookForm.reset();  // Resetowanie formularza
  }

  deleteBook(bookId: number): void {
    this.bookService.deleteBook(bookId);
  }
}

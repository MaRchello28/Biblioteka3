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
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class ManageBooksComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = []; 
  searchQuery: string = ''; 
  newBookForm!: FormGroup; 
  editingBookForm!: FormGroup;  
  editingBook: Book | null = null;

  constructor(
    private bookService: BookService,
    private fb: FormBuilder 
  ) {
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
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
      this.filteredBooks = [...this.books];  
    });
  }

  addBook(): void {
    if (this.newBookForm.valid) {
      const newBook: Book = this.newBookForm.value;
      this.bookService.addBook(newBook).subscribe(() => {
        this.newBookForm.reset(); 
        this.ngOnInit();  
      });
    }
  }

  editBook(book: Book): void {
    this.editingBook = { ...book };  
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
      const updatedBook = { ...this.editingBook, ...this.editingBookForm.value };
      this.bookService.updateBook(updatedBook).subscribe(() => {
        this.editingBook = null; 
        this.editingBookForm.reset();  
        this.ngOnInit();  
      });
    }
  }

  cancelEdit(): void {
    this.editingBook = null; 
    this.editingBookForm.reset();  
  }

  deleteBook(bookId: string): void {
    this.bookService.deleteBook(bookId).subscribe(() => {
      this.ngOnInit();  
    });
  }

  filterBooks(): void {
    if (!this.searchQuery) {
      this.filteredBooks = [...this.books]; 
    } else {
      this.filteredBooks = this.books.filter(book =>
        book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        book.genre.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  onSearchChange(): void {
    this.filterBooks();  
  }
}

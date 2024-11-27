import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Dodaj ten import
import { Book } from '../../models/book.model'; // Jeśli plik z klasą 'Book' znajduje się w folderze 'src/app/book.ts'
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-show-books',
  standalone: true,  // Używamy komponentu standalone
  templateUrl: './show-books.component.html',
  styleUrls: ['./show-books.component.css'],
  imports: [CommonModule]  // Dodaj CommonModule do imports
})
export class ShowBooksComponent implements OnInit{
  books: Book[] = [];
  constructor(private bookservice: BookService){
  }
  ngOnInit(): void {
    this.books = this.bookservice.getBooks();
  }
}

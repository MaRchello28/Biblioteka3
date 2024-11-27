import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reserve-book',
  templateUrl: './reserve-book.component.html',
  styleUrls: ['./reserve-book.component.css'],
  imports: [CommonModule]
})
export class ReserveBookComponent implements OnInit {
  books: Book[] = [];
  sortProperty: keyof Book = 'title';
  sortDirection: 'asc' | 'desc' = 'asc';
  isReserveBookVisible = true;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    // Inicjalizuj książki z serwisu
    this.books = this.bookService.books;
  }

  // Funkcja sortująca książki
  sortBooks(property: keyof Book): void {
    if (this.sortProperty === property) {
      // Jeśli ta sama kolumna, zmień kierunek sortowania
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Jeśli inna kolumna, ustaw kierunek sortowania na 'asc'
      this.sortProperty = property;
      this.sortDirection = 'asc';
    }
  
    // Sprawdzanie, czy wartość jest liczbą
    const isNumber = typeof this.books[0][property] === 'number';
  
    // Wywołanie metody sortowania w serwisie z trzema argumentami
    this.bookService.sortBooks(this.sortProperty, this.sortDirection === 'asc', isNumber);
  
    // Zaktualizowanie książek w komponencie
    this.books = [...this.bookService.books];  // Zaktualizuj lokalną kopię książek
  }

  // Sprawdzanie, czy sortowanie ma być rosnące
  private isAscending(property: keyof Book): boolean {
    return this.sortDirection === 'asc';
  }
  reserveBook(book: Book): void {
    // Zmieniamy dostępność książki na niedostępną (rezerwacja)
    book.isAvailable = false;

    // Aktualizacja książek w serwisie
    this.bookService.updateBook(book);

    // Możesz dodać dodatkową logikę, np. wyświetlanie komunikatu o rezerwacji
    alert(`${book.title} została zarezerwowana.`);
  }
}

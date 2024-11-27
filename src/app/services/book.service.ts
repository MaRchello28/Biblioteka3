import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  books: Book[] = [
    new Book(1, 'W pustyni i w puszczy', 'Henryk Sienkiewicz', 'Przygodowa', 1911, true),
    new Book(2, 'Pan Tadeusz', 'Adam Mickiewicz', 'Epika', 1834, false),
    new Book(3, 'Lalka', 'Bolesław Prus', 'Realizm', 1890, true)
  ];

  getBooks(): Book[]{
    return this.books
  }
  
  sortBooks(property: keyof Book, ascending: boolean, isNumber: boolean): void {
    if (isNumber) {
      this.books.sort((a, b) => {
        const valA = Number(a[property]);
        const valB = Number(b[property]);
        return ascending ? valA - valB : valB - valA;
      });
    } else {
      this.books.sort((a, b) => {
        const valA = a[property] as string;
        const valB = b[property] as string;
        return ascending ? valA.localeCompare(valB) : valB.localeCompare(valA);
      });
    }
  }

  updateBook(updatedBook: Book): void {
    const index = this.books.findIndex(book => book.bookId === updatedBook.bookId);
    if (index !== -1) {
      this.books[index] = updatedBook;
    }
  }
  constructor() { }
}

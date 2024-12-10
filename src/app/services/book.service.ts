import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  books: Book[] = [
    new Book(1, 'W pustyni i w puszczy', 'Henryk Sienkiewicz', 'Przygodowa', 1911, false),
    new Book(2, 'Pan Tadeusz', 'Adam Mickiewicz', 'Epika', 1834, true),
    new Book(3, 'Lalka', 'Bolesław Prus', 'Realizm', 1832, false),
    new Book(4, 'Dziady cz. III', 'Adam Mickiewicz', 'Dramat', 1890, true),
    new Book(5, 'Przedwiośnie', 'Stefan Żeromski', 'Dramat', 1925, true),
    new Book(6, 'Zbrodnia i kara', 'Fyodor Dostojewski', 'Psychologiczna', 1866, true),
    new Book(7, '1984', 'George Orwell', 'Dystopia', 1949, true),
    new Book(8, 'Mistrz i Małgorzata', 'Michaił Bułhakow', 'Magiczny realizm', 1967, true),
    new Book(9, "Niemcy", "Piotr Zychowicz", "Historyczna", 2017, false)
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

  addBook(newBook: Book): void {
    const newId = this.books.length > 0 ? Math.max(...this.books.map(b => b.bookId)) + 1 : 1;
    newBook.bookId = newId;
    this.books.push(newBook);
  }

  deleteBook(bookId: number): void {
    this.books = this.books.filter(book => book.bookId !== bookId);
  }

  updateBookAvailability(bookId: number, isAvailable: boolean): void {
    const book = this.books.find(b => b.bookId === bookId);
    if (book) {
      book.isAvailable = isAvailable;
    }
  }

  getBookTitle(bookId: number): string {
    const book = this.books.find(b => b.bookId === bookId);
    return book ? book.title : 'Nie znaleziono książki';
  }
  
  getBookAuthor(bookId: number): string {
    const book = this.books.find(b => b.bookId === bookId);
    return book ? book.author : 'Autor nieznany';
  }

  getBookGenre(bookId: number): string {
    const book = this.books.find(b => b.bookId === bookId);
    return book ? book.genre : 'Gatunek nieznany';
  }

  getBookPublicationYear(bookId: number): number {
    const book = this.books.find(b => b.bookId === bookId);
    return book ? book.publicationYear : 0;
  }

  getBookById(bookId: number): Book | undefined {
    return this.books.find(book => book.bookId === bookId);
  }

  
  constructor() { }

}

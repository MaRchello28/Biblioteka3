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

  constructor() { }
}

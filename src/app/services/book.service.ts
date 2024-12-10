import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'http://localhost:3000/books';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/get`);
  }

  addBook(newBook: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/post`, newBook);
  }

  updateBook(updatedBook: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/put/${updatedBook.bookId}`, updatedBook);
  }

  deleteBook(bookId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${bookId}`);
  }

  sortBooks(property: keyof Book, ascending: boolean): Observable<Book[]> {
    const direction = ascending ? 'asc' : 'desc';
    return this.http.get<Book[]>(`${this.apiUrl}/sort/${property}/${direction}`);
  }
}
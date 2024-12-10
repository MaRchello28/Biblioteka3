import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'http://localhost:3000/api/books';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  addBook(newBook: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, newBook);
  }

  updateBook(updatedBook: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${updatedBook.bookId}`, updatedBook);
  }

  deleteBook(bookId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${bookId}`);
  }
}
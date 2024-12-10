import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loan } from '../models/loan.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private apiUrl = 'http://localhost:3000/loans';

  constructor(private http: HttpClient) { }

  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.apiUrl}/get`);
  }

  addLoan(newLoan: Loan): Observable<Loan> {
    return this.http.post<Loan>(`${this.apiUrl}/post`, newLoan);
  }

  updateLoan(updatedLoan: Loan): Observable<Loan> {
    return this.http.put<Loan>(`${this.apiUrl}/put/${updatedLoan.loanId}`, updatedLoan);
  }

  deleteLoan(loanId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${loanId}`);
  }

  sortLoans(property: keyof Loan, ascending: boolean): Observable<Loan[]> {
    const direction = ascending ? 'asc' : 'desc';
    return this.http.get<Loan[]>(`${this.apiUrl}/sort/${property}/${direction}`);
  }

  isBookLoaned(bookId: string): Observable<boolean> {
    return this.http.get<Loan[]>(`${this.apiUrl}/get`).pipe(
      map(loans => loans.some(loan => loan.bookId === bookId && !loan.returnDate))
    );
  }

  getLoanStatistics(books: any[]): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/statistics`, { books });
  }
  markAsReturned(loanId: string): Observable<Loan> {
    return this.http.put<Loan>(`${this.apiUrl}/return/${loanId}`, {});
  }
}
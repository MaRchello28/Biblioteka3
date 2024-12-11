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
    return this.http.put<Loan>(`${this.apiUrl}/put/${updatedLoan._id}`, updatedLoan);
  }

  deleteLoan(_id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${_id}`);
  }

  sortLoans(property: keyof Loan, ascending: boolean): Observable<Loan[]> {
    const direction = ascending ? 'asc' : 'desc';
    return this.http.get<Loan[]>(`${this.apiUrl}/sort/${property}/${direction}`);
  }

  isBookLoaned(_id: string): Observable<boolean> {
    console.log("isBookLoaned"+this.http.get<Loan[]>(`${this.apiUrl}/get`).pipe(
      map((loans) => loans.some((loan) => loan._id === _id && !loan.isReturned))
    ))
    return this.http.get<Loan[]>(`${this.apiUrl}/get`).pipe(
      map((loans) => loans.some((loan) => loan._id === _id && !loan.isReturned))
    );
  }

  getLoanStatistics(books: any[]): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/statistics`, { books });
  }
  markAsReturned(_id: string): Observable<Loan> {
    return this.http.put<Loan>(`${this.apiUrl}/return/${_id}`, {});
  }
}
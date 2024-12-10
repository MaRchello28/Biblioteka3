import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loan } from '../models/loan.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private apiUrl = 'http://localhost:3000/api/loans';

  constructor(private http: HttpClient) { }

  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(this.apiUrl);
  }

  addLoan(newLoan: Loan): Observable<Loan> {
    return this.http.post<Loan>(this.apiUrl, newLoan);
  }

  updateLoan(updatedLoan: Loan): Observable<Loan> {
    return this.http.put<Loan>(`${this.apiUrl}/${updatedLoan.loanId}`, updatedLoan);
  }

  deleteLoan(loanId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${loanId}`);
  }
}
import { Injectable } from '@angular/core';
import { Loan } from '../models/loan.model';
@Injectable({
  providedIn: 'root'
})
export class LoanService {
  loans: Loan[] = [
    new Loan(1, 1, 1, new Date('2024-11-10'), new Date('2024-12-24'), false),
    new Loan(2, 2, 1, new Date('2024-11-10'), new Date('2024-11-24'), true)
  ];
  getLoans(): Loan[]{
    return this.loans
  }
  constructor() { }
}

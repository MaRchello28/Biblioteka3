import { Injectable } from '@angular/core';
import { Loan } from '../models/loan.model';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  loans: Loan[] = [
    new Loan(1, 1, 1, new Date('2024-11-10'), new Date('2024-12-24'), false),
    new Loan(2, 2, 1, new Date('2024-11-10'), new Date('2024-11-24'), true),
    new Loan(3, 9, 1, new Date('2024-11-02'), new Date('2024-11-30'), false)
  ];

  constructor() { }

  getLoans(): Loan[] {
    return this.loans;
  }
  getLoanStatistics(books: Book[]): any[] {
    const statistics = books.map(book => {
      const totalLoans = this.loans.filter(loan => loan.bookId === book.bookId).length;
      return {
        title: book.title,
        author: book.author,
        totalLoans: totalLoans
      };
    });
  
    // Liczymy ogólną liczbę wypożyczeń
    const totalLoansCount = statistics.reduce((sum, bookStat) => sum + bookStat.totalLoans, 0);
  
    // Dodajemy procentowy udział w wypożyczeniach
    const statisticsWithPercentage = statistics.map(stat => ({
      ...stat,
      percentage: totalLoansCount > 0 ? (stat.totalLoans / totalLoansCount) * 100 : 0
    }));
  
    // Sortowanie od najczęściej wypożyczanych książek
    return statisticsWithPercentage.sort((a, b) => b.totalLoans - a.totalLoans);
  }
  // Pobieranie wypożyczeń dla danego użytkownika
  getUserLoans(userId: number): Loan[] {
    return this.loans.filter(loan => loan.userId === userId);
  }

  // Sprawdzenie, czy książka jest wypożyczona
  isBookLoaned(bookId: number): boolean {
    return this.loans.some(loan => loan.bookId === bookId && !loan.isReturned);
  }

  // Metoda do oznaczania książki jako zwróconej
  markAsReturned(loanId: number): void {
    const loan = this.loans.find(loan => loan.loanId === loanId);
    if (loan) {
      loan.isReturned = true;  // Zmiana statusu na 'zwrócono'
    }
  }
}

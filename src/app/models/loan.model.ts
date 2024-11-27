export class Loan{
    loanId: number;
    bookId: number;
    userId: number;
    borrowDate: Date;
    returnDate: Date;
    isReturned: boolean;

    constructor(
        loanId: number,
        bookId: number,
        userId: number,
        borrowDate: Date,
        returnDate: Date,
        isReturned: boolean,
    ){
        this.loanId = loanId
        this.bookId = bookId
        this.userId = userId
        this.borrowDate = borrowDate
        this.returnDate = returnDate
        this.isReturned = isReturned
    }
}
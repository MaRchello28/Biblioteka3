export class Loan{
    loanId: string;
    bookId: string;
    userId: string;
    loanDate: Date;
    returnDate: Date;
    isReturned: boolean;

    constructor(
        loanId: string,
        bookId: string,
        userId: string,
        loanDate: Date,
        returnDate: Date,
        isReturned: boolean,
    ){
        this.loanId = loanId
        this.bookId = bookId
        this.userId = userId
        this.loanDate = loanDate
        this.returnDate = returnDate
        this.isReturned = isReturned
    }
}
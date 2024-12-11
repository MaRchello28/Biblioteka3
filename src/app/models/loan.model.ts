export class Loan{
    _id: string;
    bookId: string;
    userId: string;
    loanDate: Date;
    returnDate: Date;
    isReturned: boolean;

    constructor(
        _id: string,
        bookId: string,
        userId: string,
        loanDate: Date,
        returnDate: Date,
        isReturned: boolean,
    ){
        this._id = _id
        this.bookId = bookId
        this.userId = userId
        this.loanDate = loanDate
        this.returnDate = returnDate
        this.isReturned = isReturned
    }
}
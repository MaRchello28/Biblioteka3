export class Reservation {
    _id: string;
    bookId: string;
    userId: string;
    reservationDate: Date;

    constructor(
        _id: string,
        bookId: string,
        userId: string,
        reservationDate: Date,
    ) {
        this._id = _id
        this.bookId = bookId
        this.userId = userId
        this.reservationDate = reservationDate
    }
}
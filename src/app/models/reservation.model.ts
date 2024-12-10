export class Reservation {
    reservationId: string;
    bookId: string;
    userId: string;
    reservationDate: Date;

    constructor(
        reservationId: string,
        bookId: string,
        userId: string,
        reservationDate: Date,
    ) {
        this.reservationId = reservationId
        this.bookId = bookId
        this.userId = userId
        this.reservationDate = reservationDate
    }
}
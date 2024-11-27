export class Reservation {
    reservationId: number;
    bookId: number;
    userId: number;
    reservationDate: Date;

    constructor(
        reservationId: number,
        bookId: number,
        userId: number,
        reservationDate: Date,
    ) {
        this.reservationId = reservationId
        this.bookId = bookId
        this.userId = userId
        this.reservationDate = reservationDate
    }
}
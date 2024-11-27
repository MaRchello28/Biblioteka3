import { Book } from './book.model';

export class User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    borrowedBooks: Book[];

    constructor(
        userId: number,
        firstName: string,
        lastName: string,
        email: string,
        role: string,
        borrowedBooks: Book[] = []
    ) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.borrowedBooks = borrowedBooks;
    }
}

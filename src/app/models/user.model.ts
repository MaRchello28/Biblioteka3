import { Book } from './book.model';

export class User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    password: string;
    borrowedBooks: Book[];

    constructor(
        userId: string,
        firstName: string,
        lastName: string,
        email: string,
        role: string,
        password: string,
        borrowedBooks: Book[] = []
    ) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.password = password;
        this.borrowedBooks = borrowedBooks;
    }
}

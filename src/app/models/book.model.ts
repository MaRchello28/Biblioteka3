export class Book {
    bookId: number;
    title: string;
    author: string;
    genre: string;
    publicationYear: number;
    isAvailable: boolean;

    constructor(
        bookId: number,
        title: string,
        author: string,
        genre: string,
        publicationYear: number,
        isAvailable: boolean
    ) {
        this.bookId = bookId
        this.title = title
        this.author = author
        this.genre = genre
        this.publicationYear = publicationYear
        this.isAvailable = isAvailable
    }
}
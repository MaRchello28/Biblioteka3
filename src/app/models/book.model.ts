export class Book {
    bookId: string;
    title: string;
    author: string;
    genre: string;
    publicationYear: number;
    isAvailable: boolean;

    constructor(
        bookId: string,
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
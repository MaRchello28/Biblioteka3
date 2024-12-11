export class Book {
    _id: string;
    title: string;
    author: string;
    genre: string;
    publicationYear: number;
    isAvailable: boolean;

    constructor(
        _id: string,
        title: string,
        author: string,
        genre: string,
        publicationYear: number,
        isAvailable: boolean
    ) {
        this._id = _id
        this.title = title
        this.author = author
        this.genre = genre
        this.publicationYear = publicationYear
        this.isAvailable = isAvailable
    }
}
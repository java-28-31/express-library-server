import { HttpError } from "../errorHandler/HttpError.js";
class BookServiceImplEmbedded {
    constructor() {
        this.books = [];
    }
    addBook(book) {
        if (this.books.find(item => item.id === book.id))
            throw new HttpError(409, `Book with id: ${book.id} already exists`);
        this.books.push(book);
        return Promise.resolve();
    }
    getAllBooks() {
        return Promise.resolve([...this.books]);
    }
    getBookByAuthor(author) {
        return Promise.resolve([]);
    }
    pickBook(id, reader, readerId) {
        return Promise.resolve(undefined);
    }
    removeBook(id) {
        throw "";
    }
    returnBook(id) {
        return Promise.resolve(undefined);
    }
}
export const bookServiceEmbedded = new BookServiceImplEmbedded();

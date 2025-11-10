import {BookService} from "../service/BookService.js";
import {bookServiceEmbedded} from "../service/BookServiceImplEmbedded.js";
import {NextFunction, Request, Response} from "express";
import {Book, BookDto} from "../model/book.js";
import {convertBookDtoToBook} from "../utils/tools.js";

export class BookController {
     private service: BookService = bookServiceEmbedded;

     async addBook(req:Request, res:Response)  {
        const dto = req.body as BookDto;
        const book:Book = convertBookDtoToBook(dto);
        const result = await this.service.addBook(book);
        res.status(201).json(result)
}
     getAllBooks = async (req:Request, res: Response)=> {
         const result = await this.service.getAllBooks();
         res.json(result)
    }
 }


 export const bookController = new BookController();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { bookServiceEmbedded } from "../service/BookServiceImplEmbedded.js";
import { convertBookDtoToBook } from "../utils/tools.js";
export class BookController {
    constructor() {
        this.service = bookServiceEmbedded;
        this.getAllBooks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.getAllBooks();
            res.json(result);
        });
    }
    addBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dto = req.body;
            const book = convertBookDtoToBook(dto);
            const result = yield this.service.addBook(book);
            res.status(201).json(result);
        });
    }
}
export const bookController = new BookController();

import express from "express";
import {bookController} from "../controllers/BookController.js";

export const bookRouter = express.Router();

bookRouter.get('/', bookController.getAllBooks);
bookRouter.post('/', bookController.addBook); //(req, res) => {bookController.addBook(req,res)}
import express from "express";
import {bookController} from "../controllers/BookController.js";

export const bookRouter = express.Router();

bookRouter.get('/', bookController.getAllBooks);
bookRouter.post('/', bookController.addBook); //(req, res) => {bookController.addBook(req,res)}
bookRouter.delete('/', bookController.removeBook); //(req, res) => {bookController.addBook(req,res)}
bookRouter.patch('/pick', bookController.pickBook); //(req, res) => {bookController.addBook(req,res)}
bookRouter.patch('/return', bookController.returnBook); //(req, res) => {bookController.addBook(req,res)}
bookRouter.get('/author', bookController.getBookByAuthor); //(req, res) => {bookController.addBook(req,res)}
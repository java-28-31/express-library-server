import express from "express";
import {accountController} from "../controllers/AccountController.js";
import {bodyValidator} from "../middleware/bodyValidator.js";
import {ChangePassDtoJoiSchema, ReaderDtoJoiSchema, UpdateAccountJoiSchema} from "../utils/joiSchemas.js";

export const accountRouter = express.Router();

const controller = accountController;

accountRouter.post('/', bodyValidator(ReaderDtoJoiSchema), controller.createAccount); //Todo bodyValidator/Schema
accountRouter.get('/byId', controller.getAccountById);
accountRouter.delete('/', controller.removeAccount);
accountRouter.patch('/password',bodyValidator(ChangePassDtoJoiSchema), controller.changePassword);//Todo bodyValidator/Schema
accountRouter.patch('/update',bodyValidator(UpdateAccountJoiSchema), controller.editAccount); //Todo bodyValidator/Schema

import express from "express";
import {accountController} from "../controllers/AccountController.js";
import {bodyValidator} from "../middleware/bodyValidator.js";
import {
    ChangePassDtoJoiSchema,
    LoginJoiSchema,
    ReaderDtoJoiSchema,
    UpdateAccountJoiSchema
} from "../utils/joiSchemas.js";


export const accountRouter = express.Router();

const controller = accountController;

accountRouter.post('/', bodyValidator(ReaderDtoJoiSchema), controller.createAccount);
accountRouter.get('/byId', controller.getAccountById);
accountRouter.delete('/', controller.removeAccount);
accountRouter.patch('/password',bodyValidator(ChangePassDtoJoiSchema), controller.changePassword);
accountRouter.patch('/update',bodyValidator(UpdateAccountJoiSchema), controller.editAccount);
accountRouter.patch('/roles', controller.addRole);
accountRouter.post('/login', bodyValidator(LoginJoiSchema), controller.login);


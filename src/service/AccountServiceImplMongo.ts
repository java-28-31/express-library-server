import {AccountService} from "./AccountService.js";
import {Reader, UpdateReaderDto} from "../model/reader.js";
import bcrypt from "bcryptjs";
import {HttpError} from "../errorHandler/HttpError.js";
import {ReaderModel} from "../databases/mongooseSchemas.js";

class AccountServiceImplMongo implements AccountService{
    async changePassword(id: number, newPassword: string): Promise<void> {
        console.log(id, newPassword)
        const account = await ReaderModel.findById(id);
        if (!account) throw new HttpError(404, "Account not found");

            const newHash = bcrypt.hashSync(newPassword, 10);
            account.passHash = newHash;
            await account.save();

    }

    async createAccount(reader: Reader): Promise<void> {
        const temp = await ReaderModel.findById(reader._id);
        if (temp) throw new HttpError(409, "Reader already exists");
        const readerDoc = new ReaderModel(reader);
        await readerDoc.save();

    }

    async editAccount(id: number, updReader: UpdateReaderDto): Promise<Reader> {
        console.log(updReader)
        const result =
            await ReaderModel.findByIdAndUpdate(id, {
                username: updReader.username,
                email: updReader.email,
                birthdate: updReader.birthDate
            }, {new: true})
        if (!result) throw new HttpError(404, "Account not found");
        const {_id, username, email, passHash, birthDate } = result;
        return {_id, username, email, passHash, birthDate }

    }

    async getAccount(id: number): Promise<Reader> {

        const result = await ReaderModel.findById(id).lean().exec();
        if (!result) throw new HttpError(404, "Account not found");
        const {_id, username, email, passHash, birthDate } = result;
        return {_id, username, email, passHash, birthDate }
    }

    async removeAccount(id: number): Promise<Reader> {
        const result = await ReaderModel.findByIdAndDelete(id);
        if (!result) throw new HttpError(404, "Account not found");
        const {_id, username, email, passHash, birthDate } = result;
        return {_id, username, email, passHash, birthDate }
    }

    async checkPassword(id: number, pass: string) {
        const account = await this.getAccount(id);
        console.log(account)
        if(!bcrypt.compareSync(pass, account.passHash))
            throw new HttpError(401, "Wrong credentials")
    }

}

export const accountServiceMongo = new AccountServiceImplMongo();
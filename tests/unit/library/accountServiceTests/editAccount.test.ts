import {AccountServiceImplMongo} from "../../../../src/service/AccountServiceImplMongo.js";
import {ReaderModel} from "../../../../src/databases/mongooseSchemas.js";
jest.mock("../../../../src/databases/mongooseSchemas.js");

describe("AccountServiceImplMongo.editAccount", () => {
    const service = new AccountServiceImplMongo();
    const mockUpdateReaderDto = {username:"newName",
        email:"newEmail", birthDate:"newBirthdate"}
    const mockUpdatedReader = {
        _id: 123,
        username: "newName",
        email: "newEmail",
        passHash: "passHash",
        birthDate: "newBirthdate",
        roles: ["reader"]
    }
    test("Failed test: 404 Account not found", () => {
        (ReaderModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);
        expect(service.editAccount(99999, mockUpdateReaderDto)).rejects.toThrow("Account not found");
    });

    test("Passed test", async () => {
        (ReaderModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedReader);
        await expect(service.editAccount(123, mockUpdateReaderDto)).resolves.toEqual(mockUpdatedReader);
        expect(ReaderModel.findByIdAndUpdate).toHaveBeenCalledWith(mockUpdatedReader._id, mockUpdateReaderDto, {new:true})

    });
    afterEach(() => jest.clearAllMocks());
});
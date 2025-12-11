import {AccountServiceImplMongo} from "../../../../src/service/AccountServiceImplMongo.js";
import {ReaderModel} from "../../../../src/databases/mongooseSchemas.js";
import {Roles} from "../../../../src/utils/libTypes.js";

jest.mock("../../../../src/databases/mongooseSchemas.js");

describe("AccountServiceImplMongo.addRole", () => {
    const service = new AccountServiceImplMongo();

    const mockReaderWithNewRole = {
        _id: 123,
        username: "mockName",
        email: "mockEmail",
        passHash: "passHash",
        birthDate: "2011-11-11",
        roles: ["reader","admin"]
    }
    test("Failed test: Account not found", () => {
        (ReaderModel.findById as jest.Mock).mockResolvedValue(null);
        expect(service.addRole(99999, Roles.ADMIN)).rejects.toThrow("")
    });
    test("Passed test", async () => {
        const mockSave = jest.fn().mockResolvedValue(mockReaderWithNewRole);
        (ReaderModel.findById as jest.Mock).mockResolvedValue({
            roles: ["reader"],
            save: mockSave
        });
        await expect(service.addRole(123, Roles.ADMIN)).resolves.toEqual(mockReaderWithNewRole);
        expect(ReaderModel.findById).toHaveBeenCalledWith(mockReaderWithNewRole._id);
        expect(mockSave).toHaveBeenCalled();
    })
});
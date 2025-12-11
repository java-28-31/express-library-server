import {ReaderModel} from "../../../../src/databases/mongooseSchemas.js";
import {AccountServiceImplMongo} from "../../../../src/service/AccountServiceImplMongo.js";
jest.mock("../../../../src/databases/mongooseSchemas.js")

describe("AccountServiceImplMongo.RemoveAccount", () => {
    const service = new AccountServiceImplMongo();
    const mockAccount = {
        _id: 123,
        username: "MockReader",
        email: "mock@mock.com",
        passHash: "passHash",
        birthDate: "2010-10-10",
        roles: ["reader"]
    };
    test("Failed test: 404 Account not found", () => {
        (ReaderModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);
        expect(service.removeAccount(99999)).rejects.toThrow("Account not found");
    })
    test("Passed test", () => {
        (ReaderModel.findByIdAndDelete as jest.Mock).mockResolvedValue(mockAccount);
        expect(service.removeAccount(123)).resolves.toEqual(mockAccount);
        expect(ReaderModel.findByIdAndDelete).toHaveBeenCalledWith(mockAccount._id)
    })
    afterEach(() => jest.clearAllMocks());
})
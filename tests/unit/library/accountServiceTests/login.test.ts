import {AccountServiceImplMongo} from "../../../../src/service/AccountServiceImplMongo.js";
import {ReaderModel} from "../../../../src/databases/mongooseSchemas.js";
import bcrypt from "bcryptjs";
import {getJWT} from "../../../../src/utils/tools.js";
jest.mock("../../../../src/databases/mongooseSchemas.js");
jest.mock("bcryptjs");
jest.mock("../../../../src/utils/tools.js");

describe("AccountServiceImplMongo.login", () => {
    const service = new AccountServiceImplMongo();
    beforeEach(() => jest.clearAllMocks());
    const mockAccount = {
        _id: 123,
        username: "MockReader",
        email: "mock@mock.com",
        passHash: "passHash",
        birthDate: "2010-10-10",
        roles: ["reader"]
    };

    test("Failed test: Account not found", () => {
        (ReaderModel.findById as jest.Mock).mockReturnValue({
            lean: jest.fn().mockReturnValue({
                exec: jest.fn().mockResolvedValue(null)
            })
        });
        expect(service.login(99999, "password")).rejects.toThrow("Account not found");
    });
    test("Failed test: Wrong credentials", async () => {
        (ReaderModel.findById as jest.Mock).mockReturnValue({
            lean: jest.fn().mockReturnValue({
                exec: jest.fn().mockResolvedValue(mockAccount)
            })
        });
        (bcrypt.compareSync as jest.Mock).mockReturnValue(false);

        await expect(service.login(123, "wrong_password")).rejects.toThrow("Wrong credentials");
        expect(ReaderModel.findById).toHaveBeenCalledWith(mockAccount._id);
    });
    test("Passed test", async () => {
        (ReaderModel.findById as jest.Mock).mockReturnValue({
            lean: jest.fn().mockReturnValue({
                exec: jest.fn().mockResolvedValue(mockAccount)
            })
        });
        (bcrypt.compareSync as jest.Mock).mockReturnValue(true);
        (getJWT as jest.Mock).mockReturnValue("new JW token");

        await expect(service.login(123, "correct_password")).resolves.toEqual("new JW token");
        expect(ReaderModel.findById).toHaveBeenCalledWith(mockAccount._id);
        expect(bcrypt.compareSync).toHaveBeenCalledWith("correct_password", mockAccount.passHash);
        expect(getJWT).toHaveBeenCalledWith(mockAccount._id, mockAccount.roles);
    })
})
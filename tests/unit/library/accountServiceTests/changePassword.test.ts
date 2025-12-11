import {AccountServiceImplMongo} from "../../../../src/service/AccountServiceImplMongo.js";
import {ReaderModel} from "../../../../src/databases/mongooseSchemas.js";
import bcrypt from "bcryptjs";
jest.mock("../../../../src/databases/mongooseSchemas.js");
jest.mock("bcryptjs");

describe("AccountServiceImplMongo.changePassword", () => {
    const service = new AccountServiceImplMongo();

    test("Failed test: 404 Account not found", () => {
        (ReaderModel.findById as jest.Mock).mockResolvedValue(null);
        expect(service.changePassword(99999, "newPass")).rejects.toThrow("Account not found")
    });
    test("Passed test", async () => {
        const saveMock = jest.fn().mockResolvedValue(undefined);
        (ReaderModel.findById as jest.Mock).mockReturnValue({
            passHash: "oldHash",
            save: saveMock
        });
        (bcrypt.hashSync as jest.Mock).mockReturnValue("newHash");

        await expect(service.changePassword(123, "newPass")).resolves.toBeUndefined();
        expect(ReaderModel.findById).toHaveBeenCalledWith(123);
        expect(bcrypt.hashSync).toHaveBeenCalledWith("newPass", 10);
        expect(saveMock).toHaveBeenCalled();
    });
    afterEach(() => jest.clearAllMocks());
});
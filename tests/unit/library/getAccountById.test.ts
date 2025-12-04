import {AccountServiceImplMongo} from "../../../src/service/AccountServiceImplMongo.js";


describe("AccountServiceImplMongo.getAccount", () => {
    const service = new AccountServiceImplMongo()
    test('Failed test', async () => {
        await expect(service.getAccount(99999))
            .rejects.toThrow("Account not found")
    })
})
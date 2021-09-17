import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UserTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendRecoverPasswordMailUseCase } from "./SendRecoverPasswordMailUseCase";

let sendRecoverPasswordMailUseCase: SendRecoverPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send recover password mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        mailProvider = new MailProviderInMemory();

        sendRecoverPasswordMailUseCase = new SendRecoverPasswordMailUseCase(
            usersRepositoryInMemory,
            userTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    });

    it("should be able to send a recover password email to the user", async () => {
        const sendMail = jest.spyOn(mailProvider, "sendMail");

        await usersRepositoryInMemory.create({
            name: "test",
            email: "test@example.com",
            password: "test",
            driver_license: "111751",
        });

        await sendRecoverPasswordMailUseCase.execute("test@example.com");

        expect(sendMail).toHaveBeenCalled();
    });

    it("Should not be able to send a recover password email if user does not exists", async () => {
        await expect(
            sendRecoverPasswordMailUseCase.execute("test@example.com")
        ).rejects.toEqual(new AppError("User dos not exists!"));
    });

    it("Should be able to create an user token", async () => {
        const generateTokenMail = jest.spyOn(
            userTokensRepositoryInMemory,
            "create"
        );

        await usersRepositoryInMemory.create({
            name: "test",
            email: "test@example.com",
            password: "test",
            driver_license: "111751",
        });

        await sendRecoverPasswordMailUseCase.execute("test@example.com");

        expect(generateTokenMail).toBeCalled();
    });
});

import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class SendRecoverPasswordMailUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UserTokensRepository")
        private userTokensRepository: IUserTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute(email: string) {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) throw new AppError("User dos not exists!");

        const token = uuidV4();

        const expires_date = this.dateProvider.addHours(3);

        await this.userTokensRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date,
        });
    }
}

export { SendRecoverPasswordMailUseCase };

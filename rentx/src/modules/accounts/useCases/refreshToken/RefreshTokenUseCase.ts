import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
    sub: string;
    email: string;
}

interface ITokenResponse {
    token: string;
    refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UserTokensRepository")
        private userTokensRepository: IUserTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}
    async execute(token: string): Promise<ITokenResponse> {
        // Recebendo informações do token e verificando se ele existe
        // verify => função do jsonwebtoken, decodifica o token
        // sub é onde vem o id do usuário
        const { email, sub } = verify(
            token,
            auth.secret_refresh_token
        ) as IPayload;

        const user_id = sub;

        // Verifica se existe um refresh token daquele usuário
        const userToken =
            await this.userTokensRepository.findByUserIdAndRefreshToken(
                user_id,
                token
            );

        if (!userToken) {
            throw new AppError("Refresh token does not exists!");
        }

        // Se existir um token daquele usuário, ele é removido do banco para que seja criado um novo token
        await this.userTokensRepository.deleteById(userToken.id);

        // Criação do novo token, mesma maneira que é feita no authenticateUser
        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: sub,
            expiresIn: auth.expires_in_refresh_token,
        });

        const expires_date = this.dateProvider.addDays(
            auth.expires_refresh_token_days
        );

        // Insere o novo token no banco de dados
        await this.userTokensRepository.create({
            user_id,
            refresh_token,
            expires_date,
        });

        const newToken = sign({}, auth.secret_token, {
            subject: user_id,
            expiresIn: auth.expires_in_token,
        });

        return { token: newToken, refresh_token };
    }
}

export { RefreshTokenUseCase };

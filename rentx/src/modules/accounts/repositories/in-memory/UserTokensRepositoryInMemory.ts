import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";

import { IUserTokensRepository } from "../IUserTokensRepository";

class UserTokensRepositoryInMemory implements IUserTokensRepository {
    userTokens: UserTokens[] = [];

    async create({
        refresh_token,
        user_id,
        expires_date,
    }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = new UserTokens();

        Object.assign(userToken, {
            refresh_token,
            user_id,
            expires_date,
        });

        this.userTokens.push(userToken);

        return userToken;
    }

    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserTokens> {
        return this.userTokens.find(
            (userToken) =>
                userToken.user_id === user_id &&
                userToken.refresh_token === refresh_token
        );
    }

    async deleteById(id: string): Promise<void> {
        const userToken = this.userTokens.find(
            (userToken) => userToken.id === id
        );

        this.userTokens.splice(this.userTokens.indexOf(userToken));
    }

    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        return this.userTokens.find(
            (userToken) => userToken.refresh_token === refresh_token
        );
    }
}

export { UserTokensRepositoryInMemory };

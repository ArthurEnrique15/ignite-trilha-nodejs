import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    // Verifica se o token foi recebido
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error("Token missing");
    }

    // Faz a desestruturação do token, separando a cada espaço
    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(
            token,
            "7b6e492f1a222026f8467ebeeaa3e559"
        ) as IPayload;

        const usersRepository = new UsersRepository();

        // Procura o usuário pelo id
        const user = await usersRepository.findById(user_id);

        // Verifica se o usuário existe
        if (!user) {
            throw new Error("User does not exists!");
        }

        next();
    } catch {
        throw new Error("Invalid token!");
    }
}

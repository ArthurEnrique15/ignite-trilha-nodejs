import { Response, Request } from "express";
import { container } from "tsyringe";

import { SendRecoverPasswordMailUseCase } from "./SendRecoverPasswordMailUseCase";

class SendRecoverPasswordMailController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;
        const sendRecoverPasswordMailUseCase = container.resolve(
            SendRecoverPasswordMailUseCase
        );

        await sendRecoverPasswordMailUseCase.execute(email);

        return null;
    }
}

export { SendRecoverPasswordMailController };

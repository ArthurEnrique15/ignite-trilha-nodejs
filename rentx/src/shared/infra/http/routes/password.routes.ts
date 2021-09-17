import { Router } from "express";

import { SendRecoverPasswordMailController } from "@modules/accounts/useCases/sendRecoverPasswordMail/SendRecoverPasswordMailController";

const passwordRoutes = Router();

const sendRecoverPasswordMailController =
    new SendRecoverPasswordMailController();

passwordRoutes.post("/recover", sendRecoverPasswordMailController.handle);

export { passwordRoutes };

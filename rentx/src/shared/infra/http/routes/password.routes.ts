import { Router } from "express";

import { ResetUserPasswordController } from "@modules/accounts/useCases/resetPasswordUser/ResetUserPasswordController";
import { SendRecoverPasswordMailController } from "@modules/accounts/useCases/sendRecoverPasswordMail/SendRecoverPasswordMailController";

const passwordRoutes = Router();

const sendRecoverPasswordMailController =
    new SendRecoverPasswordMailController();

const resetUserPasswordController = new ResetUserPasswordController();

passwordRoutes.post("/recover", sendRecoverPasswordMailController.handle);

passwordRoutes.post("/reset", resetUserPasswordController.handle);

export { passwordRoutes };

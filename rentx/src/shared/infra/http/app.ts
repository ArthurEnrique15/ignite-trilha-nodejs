import "reflect-metadata";
import express, { NextFunction, Response, Request } from "express";
// o express não sabe lidar com os throws, então precisamos dessa biblioteca para tratar os erros
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import "@shared/container";
import { AppError } from "@shared/errors/AppError";
import { router } from "@shared/infra/http/routes";
import createConnection from "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";

createConnection();

const app = express();

app.use(express.json());

// rota na qual a documentação será disponibilizada
// setup -> arquivo json onde fica toda a documentação da api
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message,
            });
        }

        return response.status(500).json({
            status: "error",
            message: `Internal server error - ${err.message}`,
        });
    }
);

export { app };

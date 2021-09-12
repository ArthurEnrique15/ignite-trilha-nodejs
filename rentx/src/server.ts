import "reflect-metadata";
import express, { NextFunction, Response, Request } from "express";
// o express não sabe lidar com os throws, então precisamos dessa biblioteca para tratar os erros
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import "./database";
import "./shared/container";
import { AppError } from "./errors/AppError";
import { router } from "./routes";
import swaggerFile from "./swagger.json";

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

app.listen(3333, () => console.log("Server is running"));

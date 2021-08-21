import { Router } from "express";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const categoriesRoutes = Router();

// cadastro de categoria
// rota recebe a requisição, chama o serviço, executa algo e da o retorno
categoriesRoutes.post("/", (request, response) => {
    return createCategoryController.handle(request, response);
});

// listagem de categorias
categoriesRoutes.get("/", (request, response) => {
    return listCategoriesController.handle(request, response);
});

export { categoriesRoutes };

import { Router } from "express";
import multer from "multer";

import createCategoryController from "../modules/cars/useCases/createCategory";
import { importCategoryController } from "../modules/cars/useCases/ImportCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const categoriesRoutes = Router();

// dest = destino onde os arquivos importados serão salvos
const upload = multer({
    dest: "./tmp",
});

// cadastro de categoria
// rota recebe a requisição, chama o serviço, executa algo e da o retorno
categoriesRoutes.post("/", (request, response) => {
    return createCategoryController().handle(request, response);
});

// listagem de categorias
categoriesRoutes.get("/", (request, response) => {
    return listCategoriesController.handle(request, response);
});

// passa o multer como um middleware para a aplicação
// single = recebe apenas um arquivo por vez
categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
    return importCategoryController.handle(request, response);
});

export { categoriesRoutes };

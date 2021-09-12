import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";

const categoriesRoutes = Router();

// dest = destino onde os arquivos importados serão salvos
const upload = multer({
    dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

// cadastro de categoria
// rota recebe a requisição, chama o serviço, executa algo e da o retorno
// categoriesRoutes.post("/", (request, response) => {
//     return createCategoryController().handle(request, response);
// });

categoriesRoutes.post("/", createCategoryController.handle);

// listagem de categorias
// categoriesRoutes.get("/", (request, response) => {
//     return listCategoriesController.handle(request, response);
// });

categoriesRoutes.get("/", listCategoriesController.handle);

// passa o multer como um middleware para a aplicação
// single = recebe apenas um arquivo por vez
// categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
//     return importCategoryController.handle(request, response);
// });

categoriesRoutes.post(
    "/import",
    upload.single("file"),
    importCategoryController.handle
);

export { categoriesRoutes };

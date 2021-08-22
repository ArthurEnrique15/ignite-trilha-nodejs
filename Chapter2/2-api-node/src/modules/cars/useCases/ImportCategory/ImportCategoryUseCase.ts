// módulo nativo do node - file system
import csvParse from "csv-parse";
import fs from "fs";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
    name: string;
    description: string;
}

class ImportCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    // utiliza uma promise para o programa aguardar o retorno da função
    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            // cria um stream de leitura para o arquivo, passando o path dele
            const stream = fs.createReadStream(file.path);

            const categories: IImportCategory[] = [];

            // lê linha por linha do arquivo
            const parseFile = csvParse();

            // pipe - pega o que foi lido no arquivo e joga para outro lugar
            stream.pipe(parseFile);

            parseFile
                .on("data", async (line) => {
                    const [name, description] = line;
                    categories.push({ name, description });
                })
                .on("end", () => {
                    resolve(categories);
                })
                .on("error", (err) => {
                    reject(err);
                });
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);
        console.log(categories);
    }
}

export { ImportCategoryUseCase };

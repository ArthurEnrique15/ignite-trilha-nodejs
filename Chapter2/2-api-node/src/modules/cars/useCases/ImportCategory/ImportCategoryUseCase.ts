// módulo nativo do node - file system
import csvParse from "csv-parse";
import fs from "fs";

class ImportCategoryUseCase {
    execute(file: Express.Multer.File): void {
        // cria um stream de leitura para o arquivo, passando o path dele
        const stream = fs.createReadStream(file.path);

        // lê linha por linha do arquivo
        const parseFile = csvParse();

        // pipe - pega o que foi lido no arquivo e joga para outro lugar
        stream.pipe(parseFile);

        parseFile.on("data", async (line) => {
            console.log(line);
        });
    }
}

export { ImportCategoryUseCase };

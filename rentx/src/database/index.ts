import { createConnection, getConnectionOptions } from "typeorm";

// A propriedade host por padrão é uma propriedade somente de leitura.
// Se tentarmos sobrescrever o valor dela, o typescript recusa.
// Por esse motivo criamos uma interface, somente com a propriedade host e forçamos que o tipo nas nossas options seja da interface.
interface IOptions {
    host: string;
}

getConnectionOptions().then((options) => {
    // atributos newOptions e options se comportam como se fossem o mesmo objeto e conseguimos sobrescrever o valor do host
    const newOptions = options as IOptions;
    newOptions.host = "database"; // Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
    createConnection({
        ...options,
    });
});

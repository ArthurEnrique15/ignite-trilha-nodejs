// Express é um micro framework
// Auxilia no gerenciamento de rotas, a criar um servidor pra aplicação, etc
const express = require('express');

const app = express();

// Informa para o express que o tipo de parâmetro recebido é um JSON
app.use(express.json());

// get(path, (request, response));
// send => envia uma mensagem para quem está solicitando a rota
// json => retorna um json
/*
app.get("/", (request, response) => {
    return response.json({message: "Hello World ignite"});
});
*/

/**
 * GET - Buscar uma informação dentro do servidor
 * POST - Inserir uma informação no servidor
 * PUT - Alterar uma informação no servidor
 * PATCH - Alterar uma informação específica
 * DELETE - Deletar uma informação no servidor
 */

/**
 * TIPOS DE PARÂMETROS
 * 
 * Route Params => parâmetros recebidos encapsulados na rota
 * Servem para identificar um recurso, editar, deletar ou buscar tal recurso
 * 
 * Query Params => Paginação, filtro
 * São opcionais, diferentemente dos route params, que são obrigatórios
 * 
 * Body Params => objetos para inserção/alteração (JSON)
 * 
 */

app.get("/courses", (request, response) => {
    const query = request.query;
    console.log(query);
    return response.json(["Curso 1", "Curso 2", "Curso 3"]);
});

app.post("/courses", (request, response) => {
    const body = request.body;
    console.log(body);
    return response.json(["Curso 1", "Curso 2", "Curso 3", "Curso 4"]);
});

app.put("/courses/:id", (request, response) => {
    const { id } = request.params;
    console.log(id);
    return response.json(["Curso 6", "Curso 2", "Curso 3", "Curso 4"]);
});

app.patch("/courses/:id", (request, response) => {
    return response.json(["Curso 6", "Curso 7", "Curso 3", "Curso 4"]);
});

app.delete("/courses/:id", (request, response) => {
    return response.json(["Curso 6", "Curso 7", "Curso 4"]);
});

// Definição da porta 3333
// a função listen pede para o express iniciar a aplicação
app.listen(3333);
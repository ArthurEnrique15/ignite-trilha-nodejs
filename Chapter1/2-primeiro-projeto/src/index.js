const express = require('express');

// uuid tem algumas versões, no caso é utilizada a v4, que gera um número aleatório
// v4: uuidv4 => renomeia a função para uuidv4
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

// Middleware
// next => define se o middleware vai prosseguir com a operação ou não
function verifyIfExistsAccountCPF(request, response, next) {
    // cpf vai ser passado pelos headers
    const { cpf } = request.headers;

    // buscando o customer no vetor customers
    // find => retorna os dados de acordo com a condição
    const customer = customers.find((customer) => customer.cpf === cpf);

    // verifica se o customer foi encontrado
    if (!customer) {
        return response.status(404).json({ error: "Customer not found" });
    }

    // todas as rodas que chamarem o middleware terão acesso ao customer
    request.customer = customer;

    return next();
}

function getBalance(statement) {
    // reduce => itera sobre um array com o objetivo de gerar um único valor (de qualquer tipo)
    // nesse caso, é o valor total em caixa da conta (calculado com base nas operações do extrato)
    // o segundo parâmetro do reduce é em qual valor ele será iniciado
    // acc => acumulador, armazena a soma
    const balance = statement.reduce((acc, operation) => {
        if (operation.type == "credit") {
            return acc + operation.amount;
        } else {
            return acc - operation.amount;
        }
    }, 0);

    return balance;
}

/**
 * Dados para criação de uma conta
 * cpf - string
 * name - string
 * id - uuid
 * statement []
 */
app.post("/account", (request, response) => {
    const { cpf, name } = request.body;

    // verifica se o cpf já existe no array customers
    // soma => retorna verdadeiro ou falso de acordo com a condição
    const customerAltearyExists = customers.some((customer) => customer.cpf === cpf);

    if (customerAltearyExists) {
        return response.status(400).json({ error: "Customer already exists" });
    }

    // push => inserir dados dentro de um array
    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: [],
    });

    // 201 => quando um dado é criado
    return response.status(201).send();
});

// Também dá pra utilizar um middleware da seguinte forma
// app.use(verifyIfExistsAccountCPF);
// porém ela só é usada quando todas as rotas precisarem do middleware


// podemos colocar vários middlewares nos parâmetros
// porém, é importante colocá-los sempre antes do (request, response)
// recebe um cpf pelo header e retorna o extrato da conta
app.get("/statement/", verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;
    
    return response.json(customer.statement);
})

// recebe um cpf pelo header e realiza um deposito, inserindo uma operação de crédito no extrato
app.post("/deposit", verifyIfExistsAccountCPF, (request, response) => {
    const { description, amount } = request.body;

    const { customer } = request;

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit",
    }

    customer.statement.push(statementOperation);

    return response.status(201).send();
});

// recebe um cpf pelo header e realiza um saque, inserindo uma operação de débito no extrato
app.post("/withdraw", verifyIfExistsAccountCPF, (request, response) => {
    const { amount } = request.body;
    const { customer } = request;

    // verifica se existe saldo suficiente para realizar o saque
    const balance = getBalance(customer.statement);

    if (balance < amount) {
        return response.status(400).json({error: "Insufficient funds!"});
    }

    const statementOperation = {
        amount,
        created_at: new Date(),
        type: "debit",
    };

    customer.statement.push(statementOperation);

    return response.status(201).send();
})

// recebe um cpf pelo header e uma data pela query e retorna o extrato dessa data
app.get("/statement/date", verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;
    const { date } = request.query;

    const dateFormat = new Date(date + " 00:00");

    const statement = customer.statement.filter(
        (statement) => 
            statement.created_at.toDateString() === 
            new Date(dateFormat).toDateString()
    );
    
    return response.json(statement);
})

// recebe um cpf pelo header e um nome pelo body e altera o nome da pessoa
app.put("/account", verifyIfExistsAccountCPF, (request, response) => {
    const { name } = request.body;
    const { customer } = request;
    
    customer.name = name;

    return response.status(201).send();
})

// buscar uma conta
app.get("/account", verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;

    return response.json(customer);
})

// excluir uma conta
app.delete("/account", verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;

    // splice => remove uma certa quantidade de elementos de um array
    // o primeiro parâmetro é onde começar a exclusão, o segundo são quantas posições deletar
    customers.splice(customer, 1);

    return response.status(200).json(customers);
})

// buscar o saldo da conta
app.get("/balance", verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;

    const balance = getBalance(customer.statement);

    return response.json(balance);
})

app.listen(3333);
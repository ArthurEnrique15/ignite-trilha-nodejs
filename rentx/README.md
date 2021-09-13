# Cadastro de carro

**Requsitos Funcionais (RF)**

Deve ser possível cadastrar um novo carro

**Regras de Negócio**

Não deve ser possível cadastrar um carro com uma placa já existente

Por padrão, o carro deve ser cadastrado com disponibilidade, ou seja, disponível para ser alugado

Apenas usuários administradores podem realizar o cadastro

# Listagem de carros

**Requsitos Funcionais (RF)**

Deve ser possível listar todos os carros disponíveis

Deve ser possível listar todos os carros disponíveis pelo nome da categoria, marca ou carro

**Regras de Negócio**

O usuário não precisa estar logado para realizar a listagem de carros

# Cadastro de Especificação do carro

**Requsitos Funcionais (RF)**

Deve ser possível cadastrar uma especificação para um carro

**Regras de Negócio**

Não deve ser possível cadastrar uma especificação para um carro não cadastrado

Não deve ser possível cadastrar duas especificações iguais para um mesmo carro

Apenas usuários administradores podem realizar o cadastro

# Cadastro de imagens do carro

**Requsitos Funcionais (RF)**

Deve ser possível cadastrar a imagem do carro

Deve ser possível listar todos os carros (disponíveis ou não disponíveis)

**Requsitos Não Funcionais (RNF)**

Utilizar o multer para upload dos arquivos

**Regras de Negócio**

Apenas usuários administradores podem realizar o cadastro

O usuário deve poder cadastrar mais de uma imagem para o mesmo carro

# Aluguel de carro

**Requsitos Funcionais (RF)**

Deve ser possível cadastrar um aluguel

**Regras de Negócio**

O aluguel deve ter duração mínima de 24 horas

Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário

Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro



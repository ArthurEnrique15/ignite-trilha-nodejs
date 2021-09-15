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

O usuário deve estar logado na aplicação

Ao realizar um aluguel, o status do carro deverá ser modificado para indisponível

# Devolução de carro

**Requsitos Funcionais (RF)**

Deve ser possível realizar a devolução de um carro alugado

**Regras de Negócio**

Se o carro for devolvido com menos de 24 horas, deverá ser cobrada uma diária completa

Ao realizar a devolução, o carro deverá ser liberado para outro aluguel

Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel

Ao realizar a devolução, deverá ser calculado o total do aluguel

Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrada uma multa proporcional aos dias de atraso

Caso haja multa, o valor da mesma deverá ser somado ao valor total do aluguel

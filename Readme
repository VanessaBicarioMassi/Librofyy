
# Librofyy - Sistema de Aluguel de Livros

## Objetivo

Este projeto tem como objetivo oferecer uma solução completa para gestão de aluguel de livros. Ele permite o gerenciamento de usuários, livros e aluguéis, além de implementar autenticação, validações robustas e uma arquitetura modular.

## Linguagens Utilizadas

1. Node.js
2. TypeScript

## Tecnologias e Ferramentas

- **Framework Backend**: Express.js
- **Banco de Dados**: PostgreSQL
- **Query Builder**: Knex.js
- **Autenticação**: JWT (Json Web Tokens)
- **Segurança**: Bcrypt para hashing de senhas
- **Variáveis de Ambiente**: Dotenv

## Funcionalidades

### Gestão de Usuários

1. Cadastro de usuários com validação de campos.
2. Autenticação segura com JWT.
3. Atualização de informações e alteração de senha.

### Gestão de Livros

1. Listagem de livros com paginação.
2. Filtros opcionais: título, autor, gênero e data de publicação.

### Gestão de Aluguéis

1. Registro de empréstimos.
2. Cancelamento e finalização de empréstimos.
3. Consulta de aluguéis por usuário.

## Estrutura do Projeto

### Diretórios e Arquivos

```plaintext
src/
├── business/         # Lógica de negócios
│   ├── booksBusiness.ts
│   ├── rentsBusiness.ts
│   └── userBusiness.ts
├── controller/       # Controladores das requisições
│   ├── booksController.ts
│   ├── rentsController.ts
│   └── userController.ts
├── data/             # Comunicação com o banco de dados
│   ├── booksData.ts
│   ├── rentsData.ts
│   └── userData.ts
├── routers/          # Configuração das rotas
│   ├── booksRouter.ts
│   ├── rentsRouter.ts
│   └── userRouter.ts
├── services/         # Serviços auxiliares
│   ├── db.ts
│   ├── hashManager.ts
│   ├── idGenerator.ts
│   ├── token.ts
│   ├── validateCpf.ts
│   └── validatePhone.ts
├── types/            # Tipos e enums
│   └── user.ts
├── App.ts            # Configuração inicial
└── index.ts          # Ponto de entrada
```

### Descrição dos Arquivos

- **business/**: Contém as regras de negócios de usuários, livros e aluguéis.
- **controller/**: Recebe as requisições e delega para a camada de negócios.
- **data/**: Realiza as operações no banco de dados usando Knex.js.
- **routers/**: Define as rotas da API.
- **services/**: Implementa serviços como hashing, validações, tokens e conexão com o banco de dados.

## Endpoints

### Usuários
- **POST /users/cadastro**: Cadastro de usuários.
- **POST /users/login**: Login.
- **PATCH /users/atualizarSenha**: Atualizar senha.
- **PUT /users/atualizarDados**: Atualizar dados.
- **DELETE /users/deletarUsuario**: Deletar usuário.

### Livros
- **GET /books**: Listar livros com filtros opcionais.

### Aluguéis
- **POST /rents/realizarEmprestimo/:id**: Registrar empréstimo.
- **GET /rents/buscarLivrosDoUsuario**: Listar livros do usuário.
- **GET /rents/buscarEmprestimos**: Listar aluguéis.
- **DELETE /rents/cancelarEmprestimo/:id**: Cancelar empréstimo.

## Resultados Esperados

A API oferece uma experiência completa para gestão de usuários, livros e aluguéis, com segurança e validações robustas.
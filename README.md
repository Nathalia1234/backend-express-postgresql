# 🧩 Mini-Projeto Fullstack Parte I/II.v2 — Backend com PostgreSQL


## 🟣 Descrição Geral

Este projeto é a **continuação das Partes I e II** do Mini-Projeto Fullstack, com o objetivo de **substituir o banco de dados MongoDB por PostgreSQL**, mantendo toda a estrutura funcional e lógica da API.  

A aplicação backend foi desenvolvida em **Node.js + Express**, com autenticação via **JWT**, e conexão gerenciada com **PostgreSQL** utilizando a biblioteca `pg`.  

Todo o CRUD de usuários e notas foi mantido, assim como os logs, tratamento de erros e as requisições via Insomnia.

---

## 🟣 Tecnologias Utilizadas

| Categoria | Tecnologias |
|------------|--------------|
| **Backend** | Node.js, Express.js |
| **Banco de Dados** | PostgreSQL |
| **Autenticação** | JSON Web Token (JWT) |
| **Ambiente** | dotenv, nodemon |
| **Driver de Conexão** | pg (Node-Postgres) |
| **Testes de API** | Insomnia |
| **Hospedagem** | Vercel |

---

## 🟣 Estrutura de Pastas

![alt text](src/img/image-1.png)

---

## 🟣 Funcionalidades Implementadas

- ✅ **Cadastro e Login de usuários** com hash de senha e autenticação JWT  
- ✅ **CRUD completo** de anotações
- ✅ **Rotas protegidas por token JWT** (somente o usuário autenticado acessa suas próprias anotações)  
- ✅ **Tratamento de erros e respostas HTTP apropriadas**  
- ✅ **Logs de ações e erros no terminal**  
- ✅ **Utilização de variáveis de ambiente com dotenv**  
- ✅ **Hospedagem funcional (Vercel)**  

---

## 🟣 Rotas da API

### Autenticação

| Método | Rota            | Descrição                          | Autenticação |
|:--:|:--|:--|:--:|
| **POST** | `/api/register` | Registra um novo usuário           |  ❌
| **POST** | `/api/login`    | Realiza o login e gera o token JWT | ❌
| **GET**  | `/api/profile`  | Retorna o perfil do usuário logado | ✅


### Usuário
| Método | Rota | Descrição | Autenticação |
|:--:|:--|:--|:--:|
| **GET**  | `/api/users` | Lista todos os usuários (rota protegida) | ✅


### Notas
| Método | Rota | Descrição | Autenticação |
|:--:|:--|:--|:--:|
| **POST** | `/api/notes` | Cria uma nova nota | ✅ |
| **GET** | `/api/notes` | Lista todas as notas do usuário autenticado | ✅ |
| **GET** | `/api/notes?title=...` | Filtra notas por título | ✅ |
| **GET** | `/api/notes/:id` | Retorna uma nota específica | ✅ |
| **PUT** | `/api/notes/:id` | Atualiza todos os dados de uma nota existente | ✅ |
| **PATCH** | `/api/notes/:id` | Atualiza parcialmente uma nota | ✅ |
| **DELETE** | `/api/notes/:id` | Remove uma nota do usuário autenticado | ✅ |

---

## 🟣 Variáveis de Ambiente (.env)

```env
DATABASE_URL= url do banco
JWT_SECRET= chave_jwt
PORT= 3000
```
Obs.: No ambiente de produção, a variável **DATABASE_URL** foi substituída pela string do banco em nuvem (Neon).

---

## 🟣 Modelagem do Banco de Dados

![alt text](src/img/image-2.png)

> O gerenciamento do banco de dados em ambiente local foi realizado com o **pgAdmin 4**, permitindo a criação das tabelas, consultas SQL e acompanhamento das inserções durante os testes.

---
## 🟣 Como Executar Localmente

1. **Clone o repositório**
```bash
   git clone https://github.com/Nathalia1234/backend-express-postgresql.git
```

2. **Acesse o diretório do projeto**
```bash
cd backend-express-postgresql
```

3. **Instale as dependências**
```bash
npm install
```

4. **Configure o arquivo .env**
```bash
DATABASE_URL= url do banco
JWT_SECRET=chave_jwt
PORT=3000
```

5. **Inicie o servidor**
```bash
npm start
```

6. **Acesse a API**
```bash
http://localhost:3000
```
---
## 🟣 Testes de Requisição (Insomnia)

Foram criados dois ambientes no Insomnia:
- **Local:** `http://localhost:3000`
- **Produção:** ``

Em ambos:

Header:  ```Authorization: Bearer {{token_local}}```


A pasta `requests/` contém todas as requisições (local e produção).

![alt text](./src/img/image.png)

- [📄 Download requests.yaml](./requests/requests.yaml)

---

## 🟣 Hospedagem e Acesso

Backend em Produção (Vercel):

Banco de Dados em Produção:  **Neon.tech** (plataforma gratuita de hospedagem PostgreSQL)

Base URL Local: http://localhost:3000

Backend em Produção no meu domínio pessoal: 

---

## 🟣 Deploy (Vercel)
- Subir o projeto para o GitHub

- Importar o repositório na plataforma [Vercel](https://vercel.com/) (garantindo integração direta com o repositório GitHub e execução estável da API em ambiente de produção.)

- Configurar variáveis de ambiente:
    - DATABASE_URL → string do banco Neon
    - JWT_SECRET → chave secreta para JWT
    - PORT → 3000

Obs.: Foi utilizado o banco em nuvem **Neon.tech** para armazenamento de dados em produção.

- Após o deploy, o backend será acessível no vercel.

---

## 🟣 Vídeo de Demonstração

O vídeo da entrega demonstra:

- Execução das requisições no Insomnia (localmente e em produção);

- Exibição dos logs (localmente e em produção);

- Visualização dos dados cadastrados no pgAdmin;

- Rotas CRUD protegidas com JWT.


🔗 [Assista ao vídeo de demonstração]()

---